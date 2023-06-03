import { PlusIcon } from '@heroicons/react/20/solid';
import type { MouseEventHandler } from 'react';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const AddButton = ({ onClick }: ButtonProps) => (
  <button
    className="inline-flex items-center rounded-md bg-blue-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    type="button"
    onClick={onClick}
  >
    <PlusIcon className="h-5 w-5" aria-hidden="true" />
  </button>
);

export default AddButton;
