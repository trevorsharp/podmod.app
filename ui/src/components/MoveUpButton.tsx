import { ArrowUpIcon } from "@heroicons/react/20/solid";
import type { MouseEventHandler } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const MoveUpButton = ({ onClick }: ButtonProps) => (
  <div className="py-1">
    <button
      className="bg-podmod hover:bg-podmod-dark focus-visible:outline-podmod inline-flex items-center gap-x-2 rounded-md px-1.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      type="button"
      onClick={onClick}
    >
      <ArrowUpIcon className="h-4 w-4" aria-hidden="true" />
    </button>
  </div>
);

export default MoveUpButton;
