import { get, useFormContext } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { FieldKey } from '@/types/FieldKey';
import { useEffect } from 'react';

type InputProps<T extends FieldValues> = {
  formType: T | undefined;
  id: FieldKey<T>;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
};

const Input = <T extends FieldValues>({ id, placeholder = '', prefix, suffix }: InputProps<T>) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const { message: errorMessage } = get(errors, id) ?? {};

  const value = watch(id);

  useEffect(() => {
    if (
      typeof value === 'string' &&
      prefix === 'http://' &&
      (value.startsWith('http://') || value.startsWith('https://'))
    )
      setValue(id, value.replace(/^http(s){0,1}:\/\//, ''));
  }, [value, setValue, id, prefix]);

  return (
    <div className="flex flex-col">
      <div className="flex rounded-md shadow-sm">
        {prefix && (
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 px-3 text-neutral-400 md:text-sm">
            {prefix}
          </span>
        )}

        <div className="relative grow">
          <input
            className={clsx(
              'w-full rounded-none border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset dark:bg-neutral-800 md:text-sm md:leading-6',
              errorMessage
                ? 'text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-500 dark:text-red-300 '
                : 'ring-neutral-300 placeholder:text-neutral-400 focus:ring-blue-600',
              !prefix && 'rounded-l-md',
              !suffix && 'rounded-r-md'
            )}
            id={id}
            type="text"
            placeholder={placeholder}
            {...register(id)}
          />

          {errorMessage && (
            <div className="pointer-events-none absolute inset-y-2 right-0 pr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>

        {suffix && (
          <span className="inline-flex items-center rounded-r-md border border-l-0 border-neutral-300 px-3 text-neutral-500 md:text-sm">
            {suffix}
          </span>
        )}
      </div>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
