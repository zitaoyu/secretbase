import { PokemonSimpleData } from "./PokemonSimpleData";
import { Pokemon, PokemonSpecies, PokemonForm } from "pokedex-promise-v2";

interface DataLink {
  name: string | number;
  url: string | null;
}

// formatted page data
export interface PokemonPageData {
  abilities: DataLink[];
  weight: string;
  height: string;
  baseExp: number;
  heldItems: DataLink[];
  evYield: string[];
  pokedexEntry: string;
}

// TODO: create own model for pokemon page
export interface PokemonFullData {
  simpleData: PokemonSimpleData;
  pokemon: Pokemon;
  species: PokemonSpecies;
  form: PokemonForm;
  pageData?: PokemonPageData;
}
