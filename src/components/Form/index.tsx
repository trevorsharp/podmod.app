import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import sources from './sections/sources';
import title from './sections/title';
import imageUrl from './sections/imageUrl';
import mods from './sections/mods';

const Form = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({}).and(sources.schema).and(title.schema).and(imageUrl.schema).and(mods.schema)
    ),
    defaultValues: {
      ...sources.defaultValue,
      ...title.defaultValue,
      ...imageUrl.defaultValue,
      ...mods.defaultValue,
    },
  });

  const onSubmit = form.handleSubmit(
    (formValues) => {
      console.log('Valid', formValues);
    },
    (formValues) => {
      console.log('Invalid', formValues);
    }
  );

  return (
    <FormProvider {...form}>
      <form
        className="flex  max-w-4xl flex-col items-center justify-center gap-8"
        onSubmit={onSubmit}
      >
        <sources.Component />

        <div className="flex  flex-col justify-between gap-12 md:flex-row">
          <title.Component />
          <imageUrl.Component />
        </div>

        <mods.Component />
        <button className="hidden" type="submit" />
      </form>
    </FormProvider>
  );
};

export default Form;
