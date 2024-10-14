import Link from "next/link";
import { useEffect, useState } from "react";
import { SectionContainer } from "./SectionContainer";
import { SpriteGallery } from "./SpriteGallery";
import { IoArrowForward } from "react-icons/io5";
import {
  EvolutionTreeNode,
  EvolutionChain,
} from "@/app/_services/models/EvolutionChain";

interface EvolutionStageProps {
  data: EvolutionTreeNode;
}

const EvolutionStage = ({ data }: EvolutionStageProps) => {
  return (
    <div className="flex items-center justify-between gap-6 md:gap-8">
      {data.method && (
        <div className="flex w-12 flex-col items-center">
          <IoArrowForward className="fill-default text-default-500" size={32} />
          <span className="text-nowrap text-sm">{data.method}</span>
        </div>
      )}
      <Link
        className="flex flex-col items-center gap-2"
        href={`/${data.pokeapiId}`}
      >
        <SpriteGallery size="sm" imageUrl={data.spriteUrl} />
        <span className="font-medium">{data.name}</span>
      </Link>
    </div>
  );
};

interface EvolutionTreeDiagramProps {
  tree: EvolutionTreeNode;
}

const EvolutionTreeDiagram = ({ tree }: EvolutionTreeDiagramProps) => {
  if (!tree) return null;

  return (
    <div className="flex gap-6 py-1 md:gap-8">
      {/* Current Stage */}
      <EvolutionStage key={tree.pokeapiId} data={tree} />

      {/* Recursively render each subsequent evolution */}
      {tree.evolvesTo && tree.evolvesTo.length > 0 && (
        <div className="gap-6 md:gap-8">
          {tree.evolvesTo.map((evolvedNode) => (
            <EvolutionTreeDiagram
              key={evolvedNode.pokeapiId}
              tree={evolvedNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface EvolutionTableProps {
  evolutionChain: EvolutionChain;
}

export const EvolutionTable = ({ evolutionChain }: EvolutionTableProps) => {
  const [evolvable, setEvolvable] = useState(true);
  const [evolutionTrees, setEvolutionTrees] = useState<EvolutionTreeNode[]>();

  useEffect(() => {
    if (evolutionChain.evolutionTrees.length > 0) {
      setEvolutionTrees(evolutionChain.evolutionTrees);
      setEvolvable(false);
    }
  }, []);

  if (evolvable) return;

  return (
    <SectionContainer className="flex w-full justify-center" title="Evolutions">
      <div className="overflow-y-auto px-2 py-1 md:px-6 md:py-2">
        {evolutionTrees?.map((tree) => (
          <EvolutionTreeDiagram key={tree.pokeapiId} tree={tree} />
        ))}
      </div>
    </SectionContainer>
  );
};
