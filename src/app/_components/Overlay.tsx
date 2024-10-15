interface OverlayProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Overlay = ({ onClick }: OverlayProps) => {
  return (
    <div
      className={
        "fixed left-0 top-0 z-50 block h-screen w-screen bg-black opacity-40"
      }
      onClick={onClick}
    />
  );
};
