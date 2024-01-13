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
        error.message
      );

      // Retry after a delay
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  throw new Error("Max retries reached. Unable to fetch data.");
};

// Step 1: Make a request to the Pokemon API
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";

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
        const { id, name } = pokemonData;
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
          name,
          types,
          stats,
          spriteUrl: pokemonData.sprites.front_default,
          animatedSpriteUrl:
            pokemonData.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
        };

        DownloadedData.data.push(data);

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

    // Save the collected data as a JSON file
    const jsonData = JSON.stringify(DownloadedData, null, 2);
    fs.writeFileSync("collectedData.json", jsonData);
    console.log("Data collected and saved successfully!");
  })
  .catch((error) => {
    console.error("Error fetching Pokemon list:", error.message);
  });
