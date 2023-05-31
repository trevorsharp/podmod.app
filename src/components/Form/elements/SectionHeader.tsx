import type { ReactNode } from 'react';

type SectionTitleProps = {
  title: string;
  button?: ReactNode;
};

const SectionTitle = ({ title, button }: SectionTitleProps) => (
  <div className="flex min-w-full items-end justify-between gap-12 border-b border-gray-200 pb-3">
    <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
    {button}
  </div>
);

export default SectionTitle;
