import { DataLink } from "../../models/PokemonFullData";
import database from "./abilityOverrideDatabase.json";

const abilityOverrideDatabase: {
  id: number;
  pokeapiId: number;
  abilities: DataLink[];
}[] = database;

export default abilityOverrideDatabase;
