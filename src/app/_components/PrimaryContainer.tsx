import { Card } from "@heroui/react";
import WrapperProps from "./Wrapper";

interface PrimaryContainerProps extends WrapperProps {}

export const PrimaryContainer = ({
  className,
  children,
}: PrimaryContainerProps) => {
  return <Card className={className}>{children}</Card>;
};
