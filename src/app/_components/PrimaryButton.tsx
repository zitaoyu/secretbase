import { Button } from "@nextui-org/react";

interface PrimaryButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const PrimaryButton = ({ className, children }: PrimaryButtonProps) => {
  return <Button className={className}>{children}</Button>;
};
