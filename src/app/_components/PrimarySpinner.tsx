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
      className={`text-background ${className}`}
      color="default"
      size={size}
    />
  );
};
