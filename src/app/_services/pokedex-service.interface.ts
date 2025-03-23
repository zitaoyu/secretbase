import { PokemonSimpleData } from "./models/PokemonSimpleData";
import { PokemonFullData } from "./models/PokemonFullData";
import { EvolutionChain } from "./models/EvolutionChain";
import { DetailPanelData } from "./models/DetailPanelData";

export interface IPokedexService {
  getPokemonSimpleDataById(id: number): PokemonSimpleData;
  getAllPokemonSimpleData(): PokemonSimpleData[];
  getEvolutionChainById(chainId: number): EvolutionChain;
  getPokemonFullDataById(pokemonId: string | number): Promise<PokemonFullData>;
}
