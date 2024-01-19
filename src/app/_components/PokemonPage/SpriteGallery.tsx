import { PokeballSVG } from "../navbar/Logo";

interface SpriteGalleryProps {
  imageUrl: string;
}

export const SpriteGallery = ({ imageUrl }: SpriteGalleryProps) => {
  return (
    <div className="relative my-4 h-full max-h-40 w-full max-w-40">
      <PokeballSVG className="h-full w-full fill-zinc-200 dark:fill-zinc-700" />
      <img
        className="sprite absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[2] object-cover"
        src={imageUrl}
        alt="pokemon sprite"
      />
    </div>
  );
};
