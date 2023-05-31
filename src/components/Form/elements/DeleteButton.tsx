import { TrashIcon } from '@heroicons/react/20/solid';
import type { MouseEventHandler } from 'react';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const DeleteButton = ({ onClick }: ButtonProps) => (
  <div className="py-1">
    <button
      className="inline-flex items-center gap-x-2 rounded-md bg-red-600 px-1.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      type="button"
      onClick={onClick}
    >
      <TrashIcon className="h-4 w-4" aria-hidden="true" />
    </button>
  </div>
);

export default DeleteButton;
