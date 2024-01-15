import { Card } from "@nextui-org/react";

interface PrimaryContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const PrimaryContainer = ({
  className,
  children,
}: PrimaryContainerProps) => {
  return <Card className={className}>{children}</Card>;
};
