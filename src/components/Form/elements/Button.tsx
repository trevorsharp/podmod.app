import type { MouseEventHandler } from 'react';

type ButtonProps = {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = ({ text, type = 'button', onClick }: ButtonProps) => (
  <button
    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    type={type}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
