import z from "zod";
import Input from "@ui/components/Input";
import SectionHeader from "@ui/components/SectionHeader";
import url from "@shared/schemas/url";
import formSection from "@ui/utils/formSection";

const section = formSection({
  key: "imageUrl",
  schema: url.or(z.literal("")),
  Component: ({ formType }) => (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Cover Image" />
      <Input formType={formType} id="imageUrl" placeholder="Image URL" prefix="https://" />
    </div>
  ),
});

export default section;
