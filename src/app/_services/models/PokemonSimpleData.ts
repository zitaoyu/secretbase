export interface PokemonSimpleData {
  id: number;
  pokeapiId: number;
  name: string;
  formName: string | null;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
  };
  spriteUrl: string | null;
  shinySpriteUrl: string | null;
  animatedSpriteUrl: string | null;
  animatedShinySpriteUrl: string | null;
}
