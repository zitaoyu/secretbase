import { Spinner } from "@nextui-org/react";
import WrapperProps from "./Wrapper.i";

interface PrimarySpinnerProps extends WrapperProps {
  size?: "sm" | "md" | "lg";
}

export const PrimarySpinner = ({
  size = "lg",
  className,
}: PrimarySpinnerProps) => {
  return (
    <Spinner
      className={`${className}`}
      classNames={{
        base: "text-background",
        // wrapper: "",
        // circle1: "border-b-porygon-pink", // bar
        // circle2: "border-b-porygon-pink", // dots
      }}
      color="danger"
      size={size}
    />
  );
};
