import LazarusPokedex from "../_services/lavarus-pokedex-service";
import nationalDex from "../_services/national-pokedex-service";
import { IPokedexService } from "../_services/pokedex-service.interface";
import SeaglassPokedex from "../_services/seaglass-pokedex-service";
import { Game } from "../_types/game.type";

export const pokedexMap: Record<Game, IPokedexService> = {
  main: nationalDex,
  seaglass: SeaglassPokedex,
  lazarus: LazarusPokedex,
};
