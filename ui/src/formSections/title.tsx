import z from "zod";
import Input from "@ui/components/Input";
import SectionHeader from "@ui/components/SectionHeader";
import formSection from "@ui/utils/formSection";

const section = formSection({
  key: "title",
  schema: z.string(),
  Component: ({ formType }) => (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Title" />
      <Input formType={formType} id="title" placeholder="New Title" />
    </div>
  ),
});

export default section;
