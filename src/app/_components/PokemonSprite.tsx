interface PokemonSpriteProps {
  imageUrl: string;
}

export const PokemonSprite = ({ imageUrl }: PokemonSpriteProps) => {
  return (
    <img className="sprite transition group-hover:scale-125" src={imageUrl} />
  );
};
