import { Card } from "@nextui-org/react";
import WrapperProps from "./Wrapper.i";

interface PrimaryContainerProps extends WrapperProps {}

export const PrimaryContainer = ({
  className,
  children,
}: PrimaryContainerProps) => {
  return <Card className={className}>{children}</Card>;
};
