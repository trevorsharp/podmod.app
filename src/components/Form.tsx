import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import imageUrl from '~/formSections/imageUrl';
import mods from '~/formSections/mods';
import sources from '~/formSections/sources';
import title from '~/formSections/title';
import modConfigSchema from '~/schemas/modConfig';
import { decompressModConfig } from '~/services/compressionService';
import type { ModConfig } from '~/types/ModConfig';

type FormProps = {
  setModConfig: (_: ModConfig | undefined) => void;
};

const Form = ({ setModConfig }: FormProps) => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(
      z
        .object({ version: z.string() })
        .and(sources.schema)
        .and(title.schema)
        .and(imageUrl.schema)
        .and(mods.schema)
    ),
    defaultValues: {
      version: 'v1',
      ...sources.defaultValue,
      ...title.defaultValue,
      ...imageUrl.defaultValue,
      ...mods.defaultValue,
    },
  });

  const validateAndUpdateModConfig = (formValues: unknown) =>
    modConfigSchema
      .safeParseAsync(formValues)
      .then((result) => result.success && setModConfig(result.data));

  const onSubmit = form.handleSubmit(validateAndUpdateModConfig);

  const currentFormValues = useWatch({ control: form.control });

  useEffect(() => {
    validateAndUpdateModConfig(currentFormValues);
  }, [currentFormValues]);

  useEffect(() => {
    const feedIdFromUrl = window.location.pathname
      .split('/')
      .filter((segment) => segment)
      .find(() => true);

    if (feedIdFromUrl)
      decompressModConfig(feedIdFromUrl)
        .then((initialModConfig) => {
          form.setValue('sources', initialModConfig.sources);
          form.setValue('title', initialModConfig.title);
          form.setValue('imageUrl', initialModConfig.imageUrl);
          form.setValue('mods', initialModConfig.mods);
        })
        .catch(console.log);
  }, []);

  return (
    <FormProvider {...form}>
      <form
        className="flex max-w-5xl flex-col items-center justify-center gap-10"
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
