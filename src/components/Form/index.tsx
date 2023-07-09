/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { z } from 'zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ModConfig } from '~/types/ModConfig';
import sources from './sections/sources';
import title from './sections/title';
import imageUrl from './sections/imageUrl';
import mods from './sections/mods';
import { useEffect } from 'react';
import modConfigSchema from '~/schemas/modConfig';

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
