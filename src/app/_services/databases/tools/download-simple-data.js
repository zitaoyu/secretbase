const axios = require("axios");
const fs = require("fs");

// Function to make a request with retries
const fetchDataWithRetries = async (url, maxRetries = 3) => {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      attempts++;
      console.error(
        `Error fetching data (attempt ${attempts}/${maxRetries}):`,
        error.message,
      );

      // Retry after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay for retries
    }
  }

  throw new Error("Max retries reached. Unable to fetch data.");
};

// Function to send a request to each Pokemon URL
const fetchPokemonData = async (url) => {
  try {
    const pokemonData = await fetchDataWithRetries(url);
    const pokemonSpecies = await fetchDataWithRetries(pokemonData.species.url);
    // Find the name with language code "en"
    const englishNameObject = pokemonSpecies.names.find(
      (obj) => obj.language.name === "en",
    );

    const pokemonFormData = await fetchDataWithRetries(
      pokemonData.forms[0].url,
    );
    const pokemonFormObject = pokemonFormData.form_names.find(
      (obj) => obj.language.name === "en",
    );

    // Extract the English name
    let englishName = englishNameObject
      ? englishNameObject.name
      : pokemonData.name;

    const { id, name } = pokemonData;
    const types = [];
    pokemonData.types.forEach((value) => {
      if (value.type.name) {
        types.push(value.type.name);
      }
    });
    const stats = {};
    pokemonData.stats.forEach((value) => {
      if (value.base_stat && value.stat) {
        stats[value.stat.name] = value.base_stat;
      }
    });
    const data = {
      id: id,
      pokeapiId: id,
      name: englishName,
      formName: pokemonFormObject?.name || null,
      types,
      stats,
      spriteUrl: pokemonData.sprites.front_default,
      shinySpriteUrl: pokemonData.sprites.front_shiny,
      animatedSpriteUrl:
        pokemonData.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      animatedShinySpriteUrl:
        pokemonData.sprites.versions["generation-v"]["black-white"].animated
          .front_shiny,
    };
    // Log success
    console.log(`Successfully fetched data for ${name} (ID: ${id})`);
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error.message);
  }
};

// Step 1: Make a request to the Pokemon API
const nationalDexUrl = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";
const formsUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=1025";

// Step 2: Create a JSON object to store the data
const DownloadedData = {
  data: [],
};

// Function to fetch and process national Dex data
const fetchNationalDex = async () => {
  try {
    const response = await axios.get(nationalDexUrl);
    const results = response.data.results;

    // Loop through the results and initiate requests sequentially
    for (const result of results) {
      const data = await fetchPokemonData(result.url);
      DownloadedData.data.push(data);
    }

    console.log("National Dex data collected successfully!");
  } catch (error) {
    console.error("Error fetching Pokemon list:", error.message);
  }
};

// Function to fetch and process forms data
const fetchFormsData = async () => {
  try {
    const response = await axios.get(formsUrl);
    const results = response.data.results;

    // Loop through the results and initiate requests sequentially
    for (const result of results) {
      const data = await fetchPokemonData(result.url);
      const pokemonFormName = data.formName;
      if (
        pokemonFormName != null &&
        ["Alolan Form", "Galarian Form", "Hisuian Form", "Paldean Form"].some(
          (form) => pokemonFormName.includes(form),
        )
      ) {
        const targetPokemonName = data.name;
        // loop through DownloadedData from the end to start, find the first pokemon with the same name, and insert data into the index behind it
        for (let i = DownloadedData.data.length - 1; i >= 0; i--) {
          if (DownloadedData.data[i].name === targetPokemonName) {
            // Insert the form data right after the found Pokémon
            data.id = DownloadedData.data[i].id;
            DownloadedData.data.splice(i + 1, 0, data);
            console.log(
              `${data.name} (${pokemonFormName}) inserted after index ${i}.`,
            );
            break; // Break the loop once the insertion is done
          }
        }
        console.log(`${data.name} (${pokemonFormName}) added.`);
      } else {
        console.log(`${data.name} (${pokemonFormName}) skipped.`);
      }
    }

    console.log("Forms data collected successfully!");
  } catch (error) {
    console.error("Error fetching forms data:", error.message);
  }
};

// Main function to run the entire process synchronously
const run = async () => {
  // Fetch national Dex data
  await fetchNationalDex();

  // Fetch forms data
  await fetchFormsData();

  // Save the collected data as a JSON file
  const jsonData = JSON.stringify(DownloadedData, null, 2);
  fs.writeFileSync("collectedData.json", jsonData);

  console.log("Data collected and saved successfully!");
};

// Run the process
run();
