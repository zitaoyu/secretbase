import { PokemonSimpleData } from "./PokemonSimpleData";
import { Pokemon, PokemonSpecies, PokemonForm } from "pokedex-promise-v2";

// TODO: create own model for pokemon page
export interface PokemonFullData {
  simpleData: PokemonSimpleData;
  pokemon: Pokemon;
  species: PokemonSpecies;
  form: PokemonForm;
}
