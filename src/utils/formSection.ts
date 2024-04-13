import z from "zod";
import type { FieldValues } from "react-hook-form";

type SectionProps<T extends FieldValues> = {
  formType?: T;
};

const formSection = <TKey extends string, TSchema extends z.ZodTypeAny>({
  key,
  schema,
  defaultValue,
  Component,
}: {
  key: TKey;
  schema: TSchema;
  defaultValue?: z.infer<TSchema>;
  Component: React.FC<SectionProps<{ [K in TKey]?: z.infer<TSchema> }>>;
}) => {
  const formSchema = z.object({
    [key]: schema,
  }) as unknown as z.ZodObject<{ [K in TKey]: TSchema }>;

  const sectionDefaultValue = {
    [key]: defaultValue,
  } as { [K in TKey]?: z.infer<TSchema> };

  return { key, schema: formSchema, Component, defaultValue: sectionDefaultValue };
};

export default formSection;
