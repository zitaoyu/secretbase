export interface EvolutionTreeNode {
  pokeapiId: number;
  name: string;
  friendlyName: string;
  method: string | null;
  spriteUrl: string;
  evolvesTo: EvolutionTreeNode[];
}

export interface EvolutionChain {
  id: number;
  evolutionTrees: EvolutionTreeNode[];
}
