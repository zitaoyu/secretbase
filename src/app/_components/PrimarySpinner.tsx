import { Spinner } from "@heroui/react";
import WrapperProps from "./Wrapper";

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
        wrapper: "",
        circle1: "border-b-sb-primary", // bar
        circle2: "border-b-sb-primary", // dots
      }}
      size={size}
    />
  );
};
