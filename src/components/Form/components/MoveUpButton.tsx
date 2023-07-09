import { ArrowUpIcon } from '@heroicons/react/20/solid';
import type { MouseEventHandler } from 'react';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const MoveUpButton = ({ onClick }: ButtonProps) => (
  <div className="py-1">
    <button
      className="inline-flex items-center gap-x-2 rounded-md bg-podmod px-1.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-podmod-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-podmod"
      type="button"
      onClick={onClick}
    >
      <ArrowUpIcon className="h-4 w-4" aria-hidden="true" />
    </button>
  </div>
);

export default MoveUpButton;
