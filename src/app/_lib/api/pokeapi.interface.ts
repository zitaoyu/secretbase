import {
  NamedAPIResourceList,
  Pokemon,
  Move,
  PokemonSpecies,
  PokemonForm,
  EvolutionChain,
} from "pokedex-promise-v2";

export const POKEDEX_START_INDEX: number = 1;
export const POKEDEX_END_INDEX: number = 1025;

export interface PokemonSimpleData {
  id: number;
  name: string;
  form_name: string | null;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
  };
  spriteUrl: string | null;
  animatedSpriteUrl: string | null;
}

export interface PokeApiWrapperInterface {
  getBasicPokemonData(): PokemonSimpleData[];
  getPokemonList(): Promise<NamedAPIResourceList>;
  getPokemonByName(nameOrId: string | number): Promise<Pokemon>;
  getMoveByName(nameOrId: string | number): Promise<Move>;
  getMoveByNameArray(nameOrId: Array<string | number>): Promise<Move[]>;
  getSpeciesByName(nameOrId: string | number): Promise<PokemonSpecies>;
  getFormByName(nameOrId: string | number): Promise<PokemonForm>;
  getEvolutionChainById(id: number): Promise<EvolutionChain>;
  getPokemonDefaultSpriteUrlById(id: number): string;
  getPokemonAnimatedSpriteUrlById(id: number): string;
}
