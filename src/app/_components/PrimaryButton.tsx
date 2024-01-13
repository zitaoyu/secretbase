import { Button } from "@nextui-org/react";

interface PrimaryButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className,
  children,
}) => {
  return <Button className={className}>{children}</Button>;
};
