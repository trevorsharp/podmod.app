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
        className="container flex flex-col items-center justify-center gap-8 px-4 py-16"
        onSubmit={onSubmit}
      >
        <sources.Component />

        <div className="flex w-full flex-col justify-between gap-12 sm:flex-row">
          <title.Component />
          <imageUrl.Component />
        </div>

        <mods.Component />
      </form>
    </FormProvider>
  );
};

export default Form;
