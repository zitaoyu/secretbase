import { DataLink, PokemonFullData } from "../../models/PokemonFullData";
import { PokemonSimpleData } from "../../models/PokemonSimpleData";
import { EvolutionChain } from "../../models/EvolutionChain";
import abilityOverrideDatabaseJson from "./abilityOverrideDatabase.json";
import pokemonSimpleDataDatabaseSeaglassJson from "./pokemonSimpleDataDatabase-Seaglass.json";
import evolutionChainDatabaseJson from "./evolutionChainDatabase.json";
import fakemonDatabaseJson from "./fakemonDatabase.json"

export const abilityOverrideDatabase: {
    id: number;
    pokeapiId: number;
    abilities: DataLink[];
}[] = abilityOverrideDatabaseJson;
export const pokemonSimpleDataDatabaseSeaglass: PokemonSimpleData[] = pokemonSimpleDataDatabaseSeaglassJson;
export const evolutionChainDatabase: EvolutionChain[] = evolutionChainDatabaseJson;
export const fakemonDatabase: PokemonFullData[] = fakemonDatabaseJson;