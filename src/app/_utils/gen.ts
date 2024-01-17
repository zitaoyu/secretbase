export type Gen =
  | "red-blue"
  | "crystal"
  | "firered-leafgreen"
  | "platinum"
  | "black-2-white-2"
  | "omega-ruby-alpha-sapphire"
  | "ultra-sun-ultra-moon"
  | "sword-shield"
  | "scarlet-violet";

export const genMap: Record<string, Gen> = {
  "1": "red-blue",
  "2": "crystal",
  "3": "firered-leafgreen",
  "4": "platinum",
  "5": "black-2-white-2",
  "6": "omega-ruby-alpha-sapphire",
  "7": "ultra-sun-ultra-moon",
  "8": "sword-shield",
  "9": "scarlet-violet",
};
