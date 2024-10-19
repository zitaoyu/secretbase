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
    const chain = await fetchDataWithRetries(
      pokemonSpecies.evolution_chain.url,
    );
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
      evolutionChainId: chain.id,
    };
    // Log success
    console.log(`Successfully fetched data for ${name} (ID: ${id})`);
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error.message);
  }
};

const nationalDexUrl = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";
const formsUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=1025";

let DownloadedData = [];

// Function to fetch and process national Dex data
const fetchNationalDex = async () => {
  try {
    const response = await axios.get(nationalDexUrl);
    const results = response.data.results;

    // Loop through the results and initiate requests sequentially
    for (const result of results) {
      const data = await fetchPokemonData(result.url);
      DownloadedData.push(data);
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
        for (let i = DownloadedData.length - 1; i >= 0; i--) {
          if (DownloadedData[i].name === targetPokemonName) {
            // Insert the form data right after the found Pokémon
            data.id = DownloadedData[i].id;
            DownloadedData.splice(i + 1, 0, data);
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
  const extractData = JSON.parse(fs.readFileSync("./output.json", "utf-8"));
  for (const i in extractData) {
    const item = extractData[i];
    console.log(`fetching data for ${item.pokeapiId}`);
    const pokemon = await fetchPokemonData(
      `https://pokeapi.co/api/v2/pokemon/${item.pokeapiId}`,
    );
    // override Seaglass data
    pokemon.id = Number(item.id);
    // pokemon.name = item.friendlyName;
    pokemon.types = item.types;
    pokemon.stats = {
      hp: Number(item.hp),
      attack: Number(item.attack),
      defense: Number(item.defence),
      "special-attack": Number(item.specialAttack),
      "special-defense": Number(item.specialDefence),
      speed: Number(item.speed),
    };
    pokemon.spriteUrl = `https://raw.githubusercontent.com/zitaoyu/seaglass-sprites/refs/heads/main/sprites/front/${pokemon.pokeapiId}.png`;
    pokemon.shinySpriteUrl = `https://raw.githubusercontent.com/zitaoyu/seaglass-sprites/refs/heads/main/sprites/front_shiny/${pokemon.pokeapiId}.png`;
    pokemon.animatedSpriteUrl = null;
    pokemon.animatedShinySpriteUrl = null;
    DownloadedData.push(pokemon);
    // console.log(pokemon);
  }
  DownloadedData.sort((a, b) => a.id - b.id);

  DownloadedData = DownloadedData.map((value) => {
    if (value.formName === "Alolan Form") {
      return {
        ...value,
        name: "Alolan " + value.name,
      };
    }
    return value;
  });
  // Save the collected data as a JSON file
  const jsonData = JSON.stringify(DownloadedData, null, 2);
  fs.writeFileSync("collectedData.json", jsonData);

  console.log("Data collected and saved successfully!");
};

// Run the process
run();
