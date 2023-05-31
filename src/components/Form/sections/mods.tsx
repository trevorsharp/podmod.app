import { useEffect } from 'react';
import { z } from 'zod';
import { useFieldArray, useFormContext } from 'react-hook-form';
import mod from '@/schemas/mod';
import formSection from '@/utils/formSection';
import ModInput from '../elements/ModInput';
import SectionHeader from '../elements/SectionHeader';
import AddButton from '../elements/AddButton';
import DeleteButton from '../elements/DeleteButton';
import MoveUpButton from '../elements/MoveUpButton';

const defaultMod = { type: 'includes-text', option1: '' } as const;

const section = formSection({
  key: 'mods',
  schema: z.array(mod).min(1, 'Must contain at least one mod'),
  defaultValue: [defaultMod],
  Component: ({ formType }) => {
    const { control } = useFormContext();

    const { fields, append, remove, swap } = useFieldArray<NonNullable<typeof formType>>({
      control: control,
      name: 'mods',
    });

    return (
      <div className="flex w-full flex-col gap-4">
        <SectionHeader
          title="Episode Mods"
          button={<AddButton onClick={() => append(defaultMod, { shouldFocus: false })} />}
        />

        <div className="flex flex-col items-center gap-2">
          {fields.map((field, index) => (
            <div className="flex w-full items-start justify-between gap-3" key={field.id}>
              <ModInput
                formType={formType}
                type={`mods.${index}.type`}
                option1={`mods.${index}.option1`}
                option2={`mods.${index}.option2`}
                option3={`mods.${index}.option3`}
              />

              {fields.length > 1 && (
                <div className="flex justify-end gap-2">
                  {index > 0 && <MoveUpButton onClick={() => swap(index, index - 1)} />}
                  <DeleteButton onClick={() => remove(index)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
});

export default section;
