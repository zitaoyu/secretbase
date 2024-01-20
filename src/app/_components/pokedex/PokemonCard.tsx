import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { useState } from "react";
import { PokemonSprite } from "../PokemonSprite";
import { PokemonSimpleData } from "../../_lib/api/pokeapi.interface";
import { PokemonTypeBoxes } from "../PokemonTypeBox";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/app/_utils/format";

interface PokemonCardProps {
  data: PokemonSimpleData;
  isMini: boolean;
}

export const PokemonCard = ({ data, isMini = false }: PokemonCardProps) => {
  const [isHover, setIsHover] = useState(false);

  function getSpriteUrl() {
    if (isHover && data.animatedSpriteUrl !== null) {
      return data.animatedSpriteUrl;
    }
    return data.spriteUrl as string;
  }

  return (
    <Link href={`/${data.id}`}>
      <Card
        className={`group m-auto aspect-square h-full max-h-48 w-full max-w-48  hover:outline hover:outline-porygon-blue
                    ${isMini ? "max-h-28 max-w-28 p-0 md:hover:scale-110" : "max-h-48 max-w-48"}
                    `}
        isPressable
        onPress={undefined}
        shadow="sm"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <CardBody className="h-[116px] items-center justify-center overflow-hidden">
          {/* <PokemonSprite imageUrl={getSpriteUrl()} /> */}
          <img
            className={`sprite object-cover transition ${isMini ? "sprite scale-[1.5]" : "group-hover:scale-125"}`}
            src={isMini ? (data.spriteUrl as string) : getSpriteUrl()}
            alt={data.name + " sprite"}
          />
          {!isMini && <span className="absolute left-3 top-2">#{data.id}</span>}
        </CardBody>
        {!isMini && (
          <CardFooter className="flex flex-col gap-1 pt-0 font-medium">
            <PokemonTypeBoxes types={data.types} />
            {capitalizeFirstLetter(data.name)}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};
