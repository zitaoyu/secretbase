import { Spinner } from "@nextui-org/react";

interface PrimarySpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PrimarySpinner: React.FC<PrimarySpinnerProps> = ({
  size = "lg",
  className,
}) => {
  return (
    <Spinner
      className={`text-background ${className}`}
      color="default"
      size={size}
    />
  );
};
