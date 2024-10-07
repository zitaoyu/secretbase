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

export const POKEDEX_START_INDEX: number = 1;
export const POKEDEX_END_INDEX: number = 1025;

export interface PokeApiWrapperInterface {
  getBasicPokemonData(): PokemonSimpleData[];
  getPokemonList(): Promise<NamedAPIResourceList>;
  getPokemonByName(nameOrId: string | number): Promise<Pokemon>;
  getMoveByName(nameOrId: string | number): Promise<Move>;
  getMoveByNameArray(nameOrId: Array<string | number>): Promise<Move[]>;
  getSpeciesByName(nameOrId: string | number): Promise<PokemonSpecies>;
  getFormByName(nameOrId: string | number): Promise<PokemonForm>;
  getTypeByNameArray(nameArray: Array<string | number>): Promise<Type[]>;
  getEvolutionChainById(id: number): Promise<EvolutionChain>;
  getPokemonDefaultSpriteUrlById(id: number): string;
  getPokemonAnimatedSpriteUrlById(id: number): string;
}
