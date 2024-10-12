import {
  NamedAPIResourceList,
  Pokemon,
  Move,
  PokemonSpecies,
  PokemonForm,
  EvolutionChain,
  Type,
} from "pokedex-promise-v2";
import { PokemonSimpleData } from "./models/PokemonSimpleData";
import { PokemonFullData } from "./models/PokemonFullData";

export const POKEDEX_START_INDEX: number = 1;
export const POKEDEX_END_INDEX: number = 1025;

export interface PokeApiWrapperInterface {
  getPokemonSimpleDataById(id: number): PokemonSimpleData;
  getAllPokemonSimpleData(): PokemonSimpleData[];
  getPokemonFullDataById(pokemonId: string | number): Promise<PokemonFullData>;
  // wrapper method
  getMoveByName(nameOrId: string | number): Promise<Move>;
  getSpeciesByName(nameOrId: string | number): Promise<PokemonSpecies>;
  getEvolutionChainById(id: number): Promise<EvolutionChain>;
}
