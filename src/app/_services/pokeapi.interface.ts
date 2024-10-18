import {
  Move,
  PokemonSpecies,
  Pokemon,
  PokemonForm,
  Ability,
  Item,
} from "pokedex-promise-v2";

export const POKEDEX_START_INDEX: number = 1;
export const POKEDEX_END_INDEX: number = 1025;

export interface IPokeApi {
  getPokemonByName(nameOrId: string | number): Promise<Pokemon>;
  getMoveByName(nameOrId: string | number): Promise<Move>;
  getSpeciesByName(nameOrId: string | number): Promise<PokemonSpecies>;
  getFormByName(nameOrId: string | number): Promise<PokemonForm>;
  getAbilityByName(nameOrId: string | number): Promise<Ability>;
  getItemByName(nameOrId: string | number): Promise<Item>;
}
