import { z } from 'zod';
import { useFieldArray, useFormContext } from 'react-hook-form';
import mod from '@/schemas/mod';
import formSection from '@/utils/formSection';
import Select from '../elements/Select';
import Input from '../elements/Input';
import SectionHeader from '../elements/SectionHeader';
import AddButton from '../elements/AddButton';
import DeleteButton from '../elements/DeleteButton';
import MoveUpButton from '../elements/MoveUpButton';

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
] as const;

const durationOptions = [
  { value: 'hours', label: 'Hours' },
  { value: 'minutes', label: 'Minutes' },
  { value: 'seconds', label: 'Seconds' },
] as const;

const defaultMod = { type: 'includes-text', text: '' } as const;

const section = formSection({
  key: 'mods',
  schema: z.array(mod).min(1, 'Must contain at least one mod'),
  defaultValue: [defaultMod],
  Component: ({ formType }) => {
    const { control, watch } = useFormContext<NonNullable<typeof formType>>();

    const { fields, append, remove, swap } = useFieldArray<NonNullable<typeof formType>>({
      control: control,
      name: 'mods',
    });

    return (
      <div className="flex  flex-col gap-4">
        <SectionHeader
          title="Episode Mods"
          button={<AddButton onClick={() => append(defaultMod, { shouldFocus: false })} />}
        />

        <div className="flex flex-col items-center gap-6 md:gap-3">
          {fields.map((field, index) => {
            const modType = watch(`mods.${index}.type`);

            return (
              <div
                className="flex  flex-wrap items-start justify-between gap-3 rounded-md border border-neutral-200 p-3 pb-3 dark:border-neutral-600 md:flex-nowrap md:border-0 md:p-0"
                key={field.id}
              >
                <Select formType={formType} id={`mods.${index}.type`} options={modTypeOptions} />

                {fields.length > 1 && (
                  <div className="w-fit md:order-last">
                    <div className="flex gap-2">
                      {index > 0 && <MoveUpButton onClick={() => swap(index, index - 1)} />}
                      <DeleteButton onClick={() => remove(index)} />
                    </div>
                  </div>
                )}

                {modType.endsWith('-text') && (
                  <Input formType={formType} id={`mods.${index}.text`} placeholder="Text" />
                )}

                {modType.endsWith('-regex') && (
                  <>
                    <Input
                      formType={formType}
                      id={`mods.${index}.regex`}
                      placeholder="Regex"
                      prefix="/"
                      suffix="/"
                    />
                    <div className="w-full md:w-[30rem]">
                      <Input
                        formType={formType}
                        id={`mods.${index}.regexFlags`}
                        placeholder="Regex Flags"
                      />
                    </div>
                  </>
                )}

                {modType.startsWith('replace-') && (
                  <Input
                    formType={formType}
                    id={`mods.${index}.replace`}
                    placeholder="Replacement Text"
                  />
                )}

                {modType.endsWith('-duration') && (
                  <div className="flex gap-3">
                    <Input
                      formType={formType}
                      id={`mods.${index}.duration`}
                      placeholder="Duration"
                    />
                    <Select
                      formType={formType}
                      id={`mods.${index}.units`}
                      options={durationOptions}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});

export default section;
