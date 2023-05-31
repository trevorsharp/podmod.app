import { PlusIcon } from '@heroicons/react/20/solid';
import type { MouseEventHandler } from 'react';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const AddButton = ({ onClick }: ButtonProps) => (
  <div className="py-1">
    <button
      className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      type="button"
      onClick={onClick}
    >
      <PlusIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  </div>
);

export default AddButton;
