import { Button, ButtonProps } from "@heroui/react";
import WrapperProps from "./Wrapper";

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
