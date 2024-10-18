import { IPokeApi } from "./pokeapi.interface";
import Pokedex, { Move, PokemonSpecies } from "pokedex-promise-v2";

class PokeApi implements IPokeApi {
  private pokedex: Pokedex;

  constructor() {
    this.pokedex = new Pokedex({
      protocol: "https",
      versionPath: "/api/v2/",
      cacheLimit: 100 * 1000, // 100s
      timeout: 10 * 1000, // 10s
    });
  }

  getPokemonByName(nameOrId: string | number): Promise<Pokedex.Pokemon> {
    return this.pokedex.getPokemonByName(nameOrId);
  }

  getFormByName(nameOrId: string | number): Promise<Pokedex.PokemonForm> {
    return this.pokedex.getPokemonFormByName(nameOrId);
  }

  getMoveByName(nameOrId: string | number): Promise<Move> {
    return this.pokedex.getMoveByName(nameOrId);
  }

  getSpeciesByName(nameOrId: string | number): Promise<PokemonSpecies> {
    return this.pokedex.getPokemonSpeciesByName(nameOrId);
  }

  getAbilityByName(nameOrId: string | number): Promise<Pokedex.Ability> {
    return this.pokedex.getAbilityByName(nameOrId);
  }

  getItemByName(nameOrId: string | number): Promise<Pokedex.Item> {
    return this.pokedex.getItemByName(nameOrId);
  }
}

const myPokedex = new PokeApi();

export default myPokedex;
