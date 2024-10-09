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
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  throw new Error("Max retries reached. Unable to fetch data.");
};

// Step 1: Make a request to the Pokemon API
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

axios
  .get(apiUrl)
  .then(async (response) => {
    // Step 2: Create a JSON object to store the data
    const DownloadedData = {
      data: [],
    };

    // Step 3: Extract data from "results" and send additional requests
    const results = response.data.results;

    // Function to send a request to each Pokemon URL
    const fetchPokemonData = async (url) => {
      try {
        const pokemonData = await fetchDataWithRetries(url);
        const pokemonSpecies = await fetchDataWithRetries(
          pokemonData.species.url,
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

        const { id, name, order } = pokemonData;
        const types = [];
        pokemonData.types.map((value) => {
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
          id,
          order,
          name: englishName,
          form_name: pokemonFormObject?.name || null,
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
        DownloadedData.data.push(data);

        DownloadedData.data.sort((a, b) => a.order - b.order);

        // Log success
        console.log(`Successfully fetched data for ${name} (ID: ${id})`);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error.message);
      }
    };

    // Loop through the results and initiate requests sequentially
    for (const result of results) {
      await fetchPokemonData(result.url);
    }

    // TODO: sort all pokemon data in DownloadedData.data by order property which is a integer

    // Save the collected data as a JSON file
    const jsonData = JSON.stringify(DownloadedData, null, 2);
    fs.writeFileSync("collectedData.json", jsonData);
    console.log("Data collected and saved successfully!");
  })
  .catch((error) => {
    console.error("Error fetching Pokemon list:", error.message);
  });
