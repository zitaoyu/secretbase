import Link from "next/link";
import myPokedex from "@/app/_lib/api/pokeapi";
import { extractIdFromUrl } from "@/app/_utils/format";
import { Chain, EvolutionChain, PokemonSpecies } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { SectionContainer } from "./SectionContainer";
import { SpriteGallery } from "./SpriteGallery";
import { IoArrowForward } from "react-icons/io5";
import { formatName } from "@/app/_utils/format";

function getSpriteUrl(id: number | string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function getEvolutionMethod(evoDetails: any): string {
  console.log(evoDetails);
  let method;
  const trigger = evoDetails?.trigger.name;
  if (trigger === "level-up") {
    if (evoDetails?.min_level) {
      method = `Level ${evoDetails.min_level}`;
    } else if (evoDetails?.known_move) {
      method = `Learn ${formatName(evoDetails?.known_move.name)}`;
    } else if (evoDetails?.min_happiness) {
      method = `Friendship`;
    } else {
      method = `Level up`;
    }
  } else if (trigger === "trade") {
    method = `Trade`;
  } else if (trigger === "use-item") {
    method = `${formatName(evoDetails.item.name)}`;
  }

  if (evoDetails?.time_of_day) {
    method += ` (${evoDetails.time_of_day})`;
  }
  if (evoDetails?.held_item) {
    method += ` (${formatName(evoDetails.held_item.name)})`;
  }
  return method || "?";
}

interface EvoTreeNode {
  id: number;
  name: string;
  method: string | null;
  speciesData: PokemonSpecies;
  spriteUrl: string;
  evolves_to?: EvoTreeNode[];
}

async function createEvolutionTree(data: Chain): Promise<EvoTreeNode> {
  const speciesData: PokemonSpecies = await myPokedex.getSpeciesByName(
    extractIdFromUrl(data.species.url),
  );
  const name = speciesData.names.find((item) => item.language.name === "en");
  let method;
  if (data.evolution_details && data.evolution_details.length > 0) {
    method = getEvolutionMethod(
      data.evolution_details.find((item) => item.location === null),
    );
  }

  const evolveNode: EvoTreeNode = {
    id: speciesData.id,
    name: name?.name || "",
    method: method || null,
    spriteUrl: getSpriteUrl(speciesData.id),
    speciesData: speciesData,
  };

  if (data.evolves_to && data.evolves_to.length > 0) {
    evolveNode.evolves_to = await Promise.all(
      data.evolves_to.map(async (evolution: Chain) => {
        return createEvolutionTree(evolution);
      }),
    );
  }
  return evolveNode;
}
interface EvolutionStageProps {
  data: EvoTreeNode;
}

const EvolutionStage = ({ data }: EvolutionStageProps) => {
  return (
    <div className="flex items-center gap-6">
      {data.method && (
        <div className="flex w-14 flex-col items-center">
          <IoArrowForward className="fill-default text-default-500" size={32} />
          <span className="text-nowrap text-sm">{data.method}</span>
        </div>
      )}
      <Link className="flex flex-col items-center gap-2" href={`/${data.id}`}>
        <SpriteGallery size="sm" imageUrl={data.spriteUrl} />
        <span className="font-medium">{data.name}</span>
      </Link>
    </div>
  );
};

interface EvolutionTableProps {
  speciesData: PokemonSpecies;
}

export const EvolutionTable = ({ speciesData }: EvolutionTableProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [evoChainData, setEvoChainData] = useState<EvolutionChain>();
  const [evoTree, setEvoTree] = useState<EvoTreeNode>();

  useEffect(() => {
    const url = speciesData.evolution_chain?.url;
    if (url) {
      myPokedex
        .getEvolutionChainById(extractIdFromUrl(url))
        .then((data) => {
          setEvoChainData(data);
        })
        .catch(() => {
          throw Error("Cannot fetch evolution line");
        });
    }
  }, []);

  useEffect(() => {
    if (evoChainData?.chain) {
      createEvolutionTree(evoChainData.chain).then((tree) => {
        setEvoTree(tree);
        if (tree.evolves_to && tree.evolves_to.length > 0) {
          setIsLoading(false);
        }
      });
    }
  }, [evoChainData]);

  if (isLoading) return;

  return (
    <SectionContainer
      className="flex w-full justify-center sm:p-6"
      title="Evolutions"
    >
      <div className="flex gap-6 overflow-y-auto py-2">
        {/* Stage 1 */}
        <div>{evoTree && <EvolutionStage data={evoTree} />}</div>
        {/* Stage 2 */}
        {evoTree?.evolves_to && evoTree.evolves_to.length > 0 && (
          <div>
            {evoTree.evolves_to.map((node) => (
              <EvolutionStage key={node.name} data={node} />
            ))}
          </div>
        )}
        {/* Stage 3 */}
        {evoTree?.evolves_to &&
          evoTree.evolves_to.length > 0 &&
          evoTree.evolves_to[0].evolves_to &&
          evoTree.evolves_to[0].evolves_to.length > 0 && (
            <div>
              {evoTree.evolves_to[0].evolves_to.map((node) => (
                <EvolutionStage key={node.name} data={node} />
              ))}
            </div>
          )}
      </div>
    </SectionContainer>
  );
};
