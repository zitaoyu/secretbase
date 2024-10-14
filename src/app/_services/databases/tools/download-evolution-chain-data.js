const fs = require("fs");
const axios = require("axios");

// Step 1: Read and parse the JSON file
const pokemonSimpleDataDatabase = JSON.parse(
  fs.readFileSync("../pokemonSimpleDataDatabase.json", "utf-8"),
).data;
for (let i = 0; i < pokemonSimpleDataDatabase.length; i++) {
  pokemonSimpleDataDatabase[i].evolutionChainId = -1;
}

function addChainIdToPokemonSimpleData(pokemonId, chainId) {
  for (let i = 0; i < pokemonSimpleDataDatabase.length; i++) {
    if (pokemonSimpleDataDatabase[i].pokeapiId == pokemonId) {
      pokemonSimpleDataDatabase[i].evolutionChainId = chainId;
    }
  }
}

function formatName(name) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function getEvolutionMethod(evoDetails) {
  let method;
  const trigger = evoDetails?.trigger.name;
  if (trigger === "level-up") {
    if (evoDetails?.min_level) {
      method = `Level ${evoDetails.min_level}`;
    } else if (evoDetails?.known_move) {
      method = `Learn ${formatName(evoDetails?.known_move.name)}`;
    } else if (evoDetails?.min_happiness) {
      method = `Friendship`;
    } else if (evoDetails?.held_item) {
      method = `Holding ${formatName(evoDetails.held_item.name)}`;
    } else {
      method = `Level up`;
    }
  } else if (trigger === "trade") {
    method = `Trade`;
    if (evoDetails?.held_item) {
      method += ` (${formatName(evoDetails.held_item.name)})`;
    }
  } else if (trigger === "use-item") {
    method = `${formatName(evoDetails.item.name)}`;
  }

  if (evoDetails?.time_of_day) {
    method += ` (${formatName(evoDetails.time_of_day)})`;
  }
  return method || "?";
}

async function createEvolutionTree(chainData) {
  const response = await axios.get(chainData.species.url);
  const speciesData = response.data;
  const name = speciesData.names.find((item) => item.language.name === "en");

  const data = chainData;
  let method;
  if (data.evolution_details && data.evolution_details.length > 0) {
    method = getEvolutionMethod(
      data.evolution_details.find((item) => item.location === null),
    );
  }

  const evolveNode = {
    pokeapiId: speciesData.id,
    name: speciesData.name,
    friendlyName: name?.name || "",
    method: method || null,
    spriteUrl: getSpriteUrl(speciesData.id),
    evolvesTo: [],
  };

  if (data.evolves_to && data.evolves_to.length > 0) {
    evolveNode.evolvesTo = await Promise.all(
      data.evolves_to.map(async (evolution) => {
        return createEvolutionTree(evolution);
      }),
    );
  }
  return evolveNode;
}

function getAllPokemonIdFromTree(node, ids = []) {
  ids.push(node.pokeapiId);
  for (let i = 0; i < node.evolvesTo.length; i++) {
    getAllPokemonIdFromTree(node.evolvesTo[i], ids);
  }

  return ids;
}

const EvolutionChainData = [];

const fetchAllEvolutionChains = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/evolution-chain?limit=10000&offset=0",
    );

    for (let item of response.data.results) {
      console.log(`Fetching ${item.url}`);
      const chainResponse = await axios.get(item.url);
      const chain = chainResponse.data;
      const evolutionTree = await createEvolutionTree(chain.chain);
      const evolutionChain = {
        id: chain.id,
        evolutionTrees: [evolutionTree],
      };
      EvolutionChainData.push(evolutionChain);
      console.log(`Pushed chain with ID: ${chain.id}`);

      // add chain id to simple data
      const ids = getAllPokemonIdFromTree(evolutionTree);
      for (const id of ids) {
        addChainIdToPokemonSimpleData(id, chain.id);
      }
    }

    console.log("All chains fetched successfully!");
  } catch (error) {
    console.error("Error fetching evolution chains:", error);
  }
};

const run = async () => {
  await fetchAllEvolutionChains();
  // Save the collected data as a JSON file
  const jsonData = JSON.stringify(EvolutionChainData, null, 2);
  fs.writeFileSync("newEvolutionChainDatabase.json", jsonData);

  const jsonData2 = JSON.stringify(pokemonSimpleDataDatabase, null, 2);
  fs.writeFileSync("newPokemonSimpleDataDatabase.json", jsonData2);

  console.log("Data collected and saved successfully!");
};

// Run the process
run();
