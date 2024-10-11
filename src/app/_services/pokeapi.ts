import { PokeApiWrapperInterface } from "./pokeapi.interface";
import Pokedex, {
  NamedAPIResourceList,
  Pokemon,
  Move,
  PokemonSpecies,
  PokemonForm,
  Type,
} from "pokedex-promise-v2";
import { PokemonSimpleData } from "./models/PokemonSimpleData";
import basicPokemonData from "./data/basicPokemonData.json";
import { extractIdFromUrl, formatName } from "../_utils/format";
import { PokemonFullData, PokemonPageData } from "./models/PokemonFullData";

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

  getBasicPokemonDataById(id: number): PokemonSimpleData {
    return (
      basicPokemonData.data.find((item) => item.pokeapiId == id) ||
      basicPokemonData.data[0]
    );
  }

  getAllBasicPokemonData(): PokemonSimpleData[] {
    return basicPokemonData.data;
  }

  getPokemonList(): Promise<NamedAPIResourceList> {
    return this.pokedex.getPokemonsList({ limit: 1025 });
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

  getTypeByNameArray(nameArray: (string | number)[]): Promise<Type[]> {
    return this.pokedex.getTypeByName(nameArray);
  }

  getEvolutionChainById(id: number): Promise<Pokedex.EvolutionChain> {
    return this.pokedex.getEvolutionChainById(id);
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

  // TODO: add all data proccesing here instead of in components
  async getPokemonData(pokemonId: string | number): Promise<PokemonFullData> {
    const simpleData = this.getBasicPokemonDataById(pokemonId as number);
    const pokemon = await this.pokedex.getPokemonByName(pokemonId);
    const speciesId = extractIdFromUrl(pokemon.species.url);
    const species = await this.pokedex.getPokemonSpeciesByName(speciesId);
    const form = await this.pokedex.getPokemonFormByName(pokemon.forms[0].name);

    // format data for pokemon page
    const abilities = pokemon.abilities.map((ability) => {
      {
        return {
          name: formatName(ability.ability.name),
          url: null,
        };
      }
    });

    const pokemonFullData: PokemonFullData = {
      simpleData,
      pokemon,
      species,
      form,
    };

    return pokemonFullData;
  }
}

const myPokedex = new PokeApiWrapper();

export default myPokedex;
