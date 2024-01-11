interface PokemonSpriteProps {
  imageUrl: string;
}

export const PokemonSprite: React.FC<PokemonSpriteProps> = ({ imageUrl }) => {
  return (
    <img className="group-hover:scale-125 sprite transition" src={imageUrl} />
  );
};
