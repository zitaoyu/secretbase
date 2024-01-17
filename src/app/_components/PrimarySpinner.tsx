import { Spinner } from "@nextui-org/react";

interface PrimarySpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
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
