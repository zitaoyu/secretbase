import { Card } from "@nextui-org/react";

interface PrimaryContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const PrimaryContainer: React.FC<PrimaryContainerProps> = ({
  className,
  children,
}) => {
  return <Card className={className}>{children}</Card>;
};
