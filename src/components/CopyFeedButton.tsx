import { useState } from 'react';
import { LinkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

type ButtonProps = {
  textToCopy: string;
  disabled?: boolean;
};

const CopyFeedButton = ({ textToCopy, disabled = false }: ButtonProps) => {
  const defaultText = 'Copy Feed URL';

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
        'h-fit w-full rounded-md bg-podmod px-4 py-3 text-sm font-semibold text-white shadow-sm  hover:bg-podmod-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-podmod sm:w-fit',
        disabled && 'hidden'
      )}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-3">
        <LinkIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">{buttonText}</span>
      </div>
    </button>
  );
};

export default CopyFeedButton;
