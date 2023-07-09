import { useFormContext } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { FieldKey } from '~/types/FieldKey';

type SelectProps<T extends FieldValues, TValue extends string> = {
  formType: T | undefined;
  id: FieldKey<T>;
  label?: string;
  options: Readonly<{ value: TValue; label: string }[]>;
};

const Select = <T extends FieldValues, TValue extends string>({
  id,
  options,
}: SelectProps<T, TValue>) => {
  const { register } = useFormContext<T>();

  return (
    <div>
      <select
        className="block min-w-max rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-podmod dark:bg-neutral-800 md:text-sm md:leading-6"
        id={id}
        {...register(id)}
      >
        {options.map(({ value, label: optionLabel }) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
