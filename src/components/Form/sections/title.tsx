import { z } from 'zod';
import Input from '../components/Input';
import SectionHeader from '../components/SectionHeader';
import formSection from '~/utils/formSection';

const section = formSection({
  key: 'title',
  schema: z.string(),
  Component: ({ formType }) => (
    <div className="flex  flex-col gap-4">
      <SectionHeader title="Title" />
      <Input formType={formType} id="title" placeholder="New Title" />
    </div>
  ),
});

export default section;
