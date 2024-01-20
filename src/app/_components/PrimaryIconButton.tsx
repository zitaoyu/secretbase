import { Button, ButtonProps } from "@nextui-org/react";
import WrapperProps from "./Wrapper";
import { MdCatchingPokemon } from "react-icons/md";
import { IconType } from "react-icons";

interface PrimaryIconButtonProps extends ButtonProps, WrapperProps {
  icon?: IconType | undefined;
}

export const PrimaryIconButton = ({
  icon: IconComponent = MdCatchingPokemon,
  className,
  ...props
}: PrimaryIconButtonProps) => {
  return (
    <Button className={className} {...props} isIconOnly variant="bordered">
      <IconComponent className="h-full w-full p-[6px]" />
    </Button>
  );
};
