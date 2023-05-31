import { get, useFormContext } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { FieldKey } from '@/types/FieldKey';

type InputProps<T extends FieldValues> = {
  formType: T | undefined;
  id: FieldKey<T>;
  placeholder?: string;
  className?: string;
};

const Input = <T extends FieldValues>({ id, placeholder = '', className = '' }: InputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { message: errorMessage } = get(errors, id) ?? {};

  return (
    <div className={className}>
      <div className="relative rounded-md shadow-sm">
        <input
          className={clsx(
            errorMessage
              ? 'block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
              : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          )}
          id={id}
          type="text"
          placeholder={placeholder}
          {...register(id)}
        />
        {errorMessage && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default Input;
