import {
  PokeApiWrapperInterface,
  PokemonSimpleData,
} from "./pokeapi.interface";
import Pokedex, {
  NamedAPIResourceList,
  Pokemon,
  Move,
  PokemonSpecies,
  PokemonForm,
} from "pokedex-promise-v2";
import basicPokemonData from "./basicPokemonData.json";

class PokeApiWrapper implements PokeApiWrapperInterface {
  private pokedex: Pokedex;

  constructor() {
    this.pokedex = new Pokedex({
      protocol: "https",
      versionPath: "/api/v2/",
      cacheLimit: 100 * 1000, // 100s
      timeout: 10 * 1000, // 10s
    });
  }

  getBasicPokemonData(): PokemonSimpleData[] {
    return basicPokemonData.data;
  }

  getPokemonList(): Promise<NamedAPIResourceList> {
    return this.pokedex.getPokemonsList({ limit: 1024 });
  }

  getPokemonByName(nameOrId: string | number): Promise<Pokemon> {
    return this.pokedex.getPokemonByName(nameOrId);
  }

  getMoveByName(nameOrId: string | number): Promise<Move> {
    return this.pokedex.getMoveByName(nameOrId);
  }

  getMoveByNameArray(nameOrId: Array<string | number>): Promise<Move[]> {
    return this.pokedex.getMoveByName(nameOrId);
  }

  getSpeciesByName(nameOrId: string | number): Promise<PokemonSpecies> {
    return this.pokedex.getPokemonSpeciesByName(nameOrId);
  }

  getFormByName(nameOrId: string | number): Promise<PokemonForm> {
    return this.pokedex.getPokemonFormByName(nameOrId);
  }

  getPokemonDefaultSpriteUrlById(id: number): string {
    const spriteUrl: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return spriteUrl;
  }

  getPokemonAnimatedSpriteUrlById(id: number): string {
    if (id >= 650) {
      return "";
    }
    const spriteUrl: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
    return spriteUrl;
  }
}

const myPokedex = new PokeApiWrapper();

export default myPokedex;
