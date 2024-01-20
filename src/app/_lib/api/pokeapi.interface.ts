import { NamedAPIResourceList, Pokemon, Move } from "pokedex-promise-v2";

export interface PokemonSimpleData {
  id: number;
  name: string;
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
  getPokemonDefaultSpriteUrlById(id: number): string;
  getPokemonAnimatedSpriteUrlById(id: number): string;
}
