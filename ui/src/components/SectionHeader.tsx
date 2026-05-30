import type { ReactNode } from "react";

type SectionTitleProps = {
  title: string;
  button?: ReactNode;
};

const SectionTitle = ({ title, button }: SectionTitleProps) => (
  <div className="flex items-end justify-between gap-12 border-b border-neutral-300 pb-3 dark:border-neutral-600">
    <h3 className="font-semibold">{title}</h3>
    {button}
  </div>
);

export default SectionTitle;
