import { PrimarySpinner } from "../PrimarySpinner";
import WrapperProps from "../Wrapper";
import { SectionTitle } from "./SectionTitle";

interface SectionContainerProps extends WrapperProps {
  title?: string;
}

export const SectionContainer = ({
  className,
  children,
  title = undefined,
}: SectionContainerProps) => {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      {title && <SectionTitle title={title} />}
      <div
        className={`w-full rounded-xl p-1 text-sm outline outline-default sm:text-base ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
