import { DataLink, PokemonFullData } from "../../models/PokemonFullData";
import { PokemonSimpleData } from "../../models/PokemonSimpleData";
import { EvolutionChain } from "../../models/EvolutionChain";
import abilityOverrideDatabaseJson from "./abilityOverrideDatabase.json";
import pokemonSimpleDataDatabaseLazarusJson from "./pokemonSimpleDataDatabase.json";
import evolutionChainDatabaseJson from "./evolutionChainDatabase.json";
import fakemonDatabaseJson from "./fakemonDatabase.json";

export const abilityOverrideDatabase: {
  id: number;
  pokeapiId: number;
  abilities: DataLink[];
}[] = abilityOverrideDatabaseJson;
export const pokemonSimpleDataDatabaseLazarus: PokemonSimpleData[] =
  pokemonSimpleDataDatabaseLazarusJson;
export const evolutionChainDatabase: EvolutionChain[] =
  evolutionChainDatabaseJson;
export const fakemonDatabase: PokemonFullData[] = fakemonDatabaseJson;
