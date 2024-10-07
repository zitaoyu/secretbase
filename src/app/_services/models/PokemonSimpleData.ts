export interface PokemonSimpleData {
  id: number;
  name: string;
  form_name: string | null;
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
  animatedSpriteUrl: string | null;
}
