import { Button, ButtonProps } from "@nextui-org/react";
import WrapperProps from "./Wrapper.i";

interface PrimaryButtonProps extends ButtonProps, WrapperProps {}

export const PrimaryButton = ({
  className,
  children,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  );
};
