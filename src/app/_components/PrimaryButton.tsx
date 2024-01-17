import { Button, ButtonProps } from "@nextui-org/react";

interface PrimaryButtonProps extends ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

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
