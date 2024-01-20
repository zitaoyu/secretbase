import WrapperProps from "./Wrapper";

interface PokemonSpriteProps extends WrapperProps {
  imageUrl: string;
}

export const PokemonSprite = ({ imageUrl, className }: PokemonSpriteProps) => {
  return (
    <img
      className={className + " sprite"}
      src={imageUrl}
      alt="pokemon sprite"
    />
  );
};
