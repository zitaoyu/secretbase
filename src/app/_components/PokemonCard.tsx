import { Card, CardBody, CardFooter } from "@nextui-org/react";
import myPokedex from "../_apis/pokeapi";
import { useState } from "react";
import { PokemonSprite } from "./PokemonSprite";

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

interface PokemonCardProps {
  id: number;
  name: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ id, name }) => {
  const [isHover, setIsHover] = useState(false);

  const defaultSpriteUrl = myPokedex.getPokemonDefaultSpriteUrlById(id);
  const animatedSpriteUrl = myPokedex.getPokemonAnimatedSpriteUrlById(id);

  return (
    <Card
      className="h-full w-full group max-w-48 m-auto hover:outline hover:outline-porygon-blue"
      isPressable
      onPress={undefined}
      shadow="sm"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CardBody className="items-center h-[116px] justify-center overflow-hidden">
        <PokemonSprite
          imageUrl={
            isHover && animatedSpriteUrl !== ""
              ? animatedSpriteUrl
              : defaultSpriteUrl
          }
        />
        <span className="absolute left-3 top-2">#{id}</span>
      </CardBody>
      <CardFooter className="pt-0 font-medium">
        {capitalizeFirstLetter(name)}
      </CardFooter>
    </Card>
  );
};
