interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return <h1 className="text-center text-lg">{title}</h1>;
};
