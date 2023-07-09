/* eslint-disable @typescript-eslint/no-misused-promises */
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ModConfig } from '~/types/ModConfig';
import sources from './sections/sources';
import title from './sections/title';
import imageUrl from './sections/imageUrl';
import mods from './sections/mods';

type FormProps = {
  setModConfig: (_: ModConfig | undefined) => void;
};

const Form = ({ setModConfig }: FormProps) => {
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
      const modConfig: ModConfig = {
        version: 'v1',
        sources: formValues.sources?.map((source) => source.url) ?? [],
        title: formValues.title,
        imageUrl: formValues.imageUrl,
        episodeMods: formValues.mods ?? [],
      };

      setModConfig(modConfig);
    },
    (formValues) => {
      console.log('Invalid', formValues);
    }
  );

  return (
    <FormProvider {...form}>
      <form
        className="flex  max-w-4xl flex-col items-center justify-center gap-10"
        onSubmit={onSubmit}
      >
        <sources.Component />

        <div className="flex flex-col justify-between gap-10 md:flex-row">
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
