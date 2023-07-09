import clsx from 'clsx';
import { useState } from 'react';

type ButtonProps = {
  defaultText: string;
  textToCopy: string;
  disabled?: boolean;
};

const CopyButton = ({ defaultText, textToCopy, disabled = false }: ButtonProps) => {
  const [buttonText, setButtonText] = useState<string>(defaultText);

  const onClick = () => {
    if (!disabled)
      void navigator.clipboard.writeText(textToCopy).then(() => {
        setButtonText('Copied!');
        setTimeout(() => setButtonText(defaultText), 2000);
      });
  };

  return (
    <button
      className={clsx(
        'w-full rounded-md bg-podmod px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  hover:bg-podmod-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-podmod sm:w-48',
        disabled && 'hidden'
      )}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default CopyButton;
