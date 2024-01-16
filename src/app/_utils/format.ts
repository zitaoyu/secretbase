export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Example: "https://pokeapi.co/api/v2/machine/61/"
// return 61
export function extractIdFromUrl(url: string): number {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 2];
  return /^\d+$/.test(lastPart) ? parseInt(lastPart, 10) : -1;
}
