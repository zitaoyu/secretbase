import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { useState } from "react";
import { PokemonSprite } from "../PokemonSprite";
import { PokemonSimpleData } from "../../_lib/api/pokeapi.i";
import { PokemonTypeBoxes } from "../PokemonTypeBox";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/app/_utils/format";

interface PokemonCardProps {
  data: PokemonSimpleData;
}

export const PokemonCard = ({ data }: PokemonCardProps) => {
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
        className="group m-auto h-full w-full max-w-48 hover:outline hover:outline-porygon-blue"
        isPressable
        onPress={undefined}
        shadow="sm"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <CardBody className="h-[116px] items-center justify-center overflow-hidden">
          <PokemonSprite imageUrl={getSpriteUrl()} />
          <span className="absolute left-3 top-2">#{data.id}</span>
        </CardBody>
        <CardFooter className="flex flex-col gap-1 pt-0 font-medium">
          <PokemonTypeBoxes types={data.types} />
          {capitalizeFirstLetter(data.name)}
        </CardFooter>
      </Card>
    </Link>
  );
};
