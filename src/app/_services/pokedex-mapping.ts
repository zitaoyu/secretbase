import nationalDex from "./national-pokedex-service";
import { IPokedexService } from "./pokedex-service.interface";
import SeaglassPokedex from "./seaglass-pokedex-service";

export type Game = "main" | "seaglass";

export const pokedexMap: Record<Game, IPokedexService> = {
  main: nationalDex,
  seaglass: SeaglassPokedex,
};
