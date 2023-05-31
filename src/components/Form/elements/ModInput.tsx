import { useFormContext } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { FieldKey } from '@/types/FieldKey';
import type { ModType } from '@/types/ModType';
import Select from './Select';
import Input from './Input';
import { useEffect } from 'react';

const modTypeOptions = [
  { value: 'includes-text', label: 'Includes Text' },
  { value: 'excludes-text', label: 'Excludes Text' },
  { value: 'replace-text', label: 'Replace Text' },
  { value: 'remove-text', label: 'Remove Text' },
  { value: 'prepend-text', label: 'Prepend Text' },
  { value: 'append-text', label: 'Append Text' },
  { value: 'matches-regex', label: 'Matches Regex' },
  { value: 'replace-regex', label: 'Replace Regex' },
  { value: 'remove-regex', label: 'Remove Regex' },
  { value: 'minimum-duration', label: 'Minimum Duration' },
  { value: 'maximum-duration', label: 'Maximum Duration' },
] satisfies { value: ModType; label: string }[];

type ModInputProps<T extends FieldValues> = {
  formType: T | undefined;
  type: FieldKey<T>;
  option1: FieldKey<T>;
  option2: FieldKey<T>;
  option3: FieldKey<T>;
};

const ModInput = <T extends FieldValues>({
  formType,
  type,
  option1,
  option2,
  option3,
}: ModInputProps<T>) => {
  const { watch, resetField } = useFormContext<T>();
  const selectedModType = watch(type) as ModType | undefined;

  useEffect(() => {
    resetField(option1);
    resetField(option2);
    resetField(option3);
  }, [selectedModType, resetField, option1, option2, option3]);

  return (
    <>
      <Select id={type} options={modTypeOptions} />

      {(selectedModType === undefined ||
        selectedModType === 'includes-text' ||
        selectedModType === 'excludes-text' ||
        selectedModType === 'remove-text' ||
        selectedModType === 'prepend-text' ||
        selectedModType === 'append-text') && (
        <Input className="w-full" formType={formType} id={option1} placeholder="Text" />
      )}

      {selectedModType === 'replace-text' && (
        <>
          <Input
            className="w-full"
            formType={formType}
            id={option1}
            placeholder="Text to Replace"
          />
          <Input
            className="w-full"
            formType={formType}
            id={option2}
            placeholder="Replacement Text"
          />
        </>
      )}

      {(selectedModType === 'matches-regex' ||
        selectedModType === 'replace-regex' ||
        selectedModType === 'remove-regex') && (
        <>
          <Input
            className="w-full"
            formType={formType}
            id={option1}
            placeholder="Regular Expression"
          />
          <Input className="w-full" formType={formType} id={option2} placeholder="Regex Options" />
        </>
      )}

      {selectedModType === 'replace-regex' && (
        <Input className="w-full" formType={formType} id={option3} placeholder="Replacement Text" />
      )}

      {(selectedModType === 'minimum-duration' || selectedModType === 'maximum-duration') && (
        <>
          <Input className="w-full" formType={formType} id={option1} placeholder="Duration" />
          <Input className="w-full" formType={formType} id={option2} placeholder="Units" />
        </>
      )}
    </>
  );
};

export default ModInput;
