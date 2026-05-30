import { useFieldArray, useFormContext } from "react-hook-form";
import z from "zod";
import AddButton from "@ui/components/AddButton";
import DeleteButton from "@ui/components/DeleteButton";
import Input from "@ui/components/Input";
import SectionHeader from "@ui/components/SectionHeader";
import url from "@shared/schemas/url";
import formSection from "@ui/utils/formSection";

const section = formSection({
  key: "sources",
  schema: z.array(url).min(1, "Must contain at least one source"),
  defaultValue: ["https://"],
  Component: ({ formType }) => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray<NonNullable<typeof formType>>({
      control: control,
      name: "sources" as never,
    });

    return (
      <div className="flex flex-col gap-4">
        <SectionHeader
          title="Sources"
          button={<AddButton onClick={() => append("https://", { shouldFocus: false })} />}
        />

        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div className="flex items-start gap-3" key={field.id}>
              <Input
                formType={formType}
                id={`sources.${index}`}
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
