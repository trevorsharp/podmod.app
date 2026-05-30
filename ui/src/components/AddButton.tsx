import { PlusIcon } from "@heroicons/react/20/solid";
import type { MouseEventHandler } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const AddButton = ({ onClick }: ButtonProps) => (
  <button
    className="bg-podmod hover:bg-podmod-dark focus-visible:outline-podmod inline-flex items-center rounded-md px-1 py-1 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    type="button"
    onClick={onClick}
  >
    <PlusIcon className="h-5 w-5" aria-hidden="true" />
  </button>
);

export default AddButton;
