import { z } from 'zod';
import { useFieldArray, useFormContext } from 'react-hook-form';
import url from '~/schemas/url';
import formSection from '~/utils/formSection';
import Input from '../components/Input';
import SectionHeader from '../components/SectionHeader';
import AddButton from '../components/AddButton';
import DeleteButton from '../components/DeleteButton';

const defaultSource = { url: '' } as const;

const section = formSection({
  key: 'sources',
  schema: z.array(z.object({ url: url })).min(1, 'Must contain at least one source'),
  defaultValue: [defaultSource],
  Component: ({ formType }) => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray<NonNullable<typeof formType>>({
      control: control,
      name: 'sources',
    });

    return (
      <div className="flex  flex-col gap-4">
        <SectionHeader
          title="Sources"
          button={<AddButton onClick={() => append(defaultSource, { shouldFocus: false })} />}
        />

        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div className="flex items-start gap-3" key={field.id}>
              <Input
                formType={formType}
                id={`sources.${index}.url`}
                placeholder="Source URL"
                prefix="https://"
              />
              {fields.length > 1 && <DeleteButton onClick={() => remove(index)} />}
            </div>
          ))}
        </div>
      </div>
    );
  },
});

export default section;
