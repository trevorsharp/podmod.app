import { useFormContext } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { FieldKey } from '@/types/FieldKey';

type SelectProps<T extends FieldValues> = {
  id: FieldKey<T>;
  label?: string;
  options: { value: string; label: string }[];
};

const Select = <T extends FieldValues>({ id, options }: SelectProps<T>) => {
  const { register } = useFormContext();

  return (
    <div>
      <select
        className="block w-full min-w-max rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
