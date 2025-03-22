import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { useState } from "react";
import { PokemonSimpleData } from "@/app/_services/models/PokemonSimpleData";
import { PokemonTypeBoxes } from "../PokemonTypeBox";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/app/_utils/format";
import { useParams, usePathname } from "next/navigation";

interface PokemonCardProps {
  data: PokemonSimpleData;
  isMini: boolean;
  showShiny: boolean;
}

export const PokemonCard = ({
  data,
  isMini = false,
  showShiny = false,
}: PokemonCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const { game, id } = useParams();
  const basePath =
    id === undefined ? `${game}/${data.pokeapiId}` : `${data.pokeapiId}`;

  function getSpriteUrl() {
    if (showShiny) {
      if (isHover && data.animatedShinySpriteUrl !== null) {
        return data.animatedShinySpriteUrl;
      }
      return data.shinySpriteUrl as string;
    } else {
      if (isHover && data.animatedSpriteUrl !== null) {
        return data.animatedSpriteUrl;
      }
      return data.spriteUrl as string;
    }
  }

  function getMiniSpriteUrl(): string {
    if (showShiny) {
      return data.shinySpriteUrl as string;
    } else {
      return data.spriteUrl as string;
    }
  }

  return (
    <Link href={`${basePath}`} scroll>
      <Card
        className={`group m-auto aspect-square h-full max-h-48 w-full max-w-48 hover:border-2 hover:border-sb-primary
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
          <div
            className={`flex h-24 w-24 items-center justify-center transition ${!isMini && "group-hover:scale-125"}`}
          >
            <img
              className={`sprite ${data.animatedSpriteUrl === null && "h-full w-full"}`}
              src={isMini ? getMiniSpriteUrl() : getSpriteUrl()}
              alt={data.name + " sprite"}
            />
          </div>

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
