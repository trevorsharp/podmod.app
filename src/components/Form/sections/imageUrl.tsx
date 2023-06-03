import { z } from 'zod';
import Input from '../components/Input';
import SectionHeader from '../components/SectionHeader';
import url from '@/schemas/url';
import formSection from '@/utils/formSection';

const section = formSection({
  key: 'imageUrl',
  schema: url.or(z.literal('')),
  Component: ({ formType }) => (
    <div className="flex  flex-col gap-4">
      <SectionHeader title="Cover Image" />
      <Input formType={formType} id="imageUrl" placeholder="Image URL" prefix="https://" />
    </div>
  ),
});

export default section;
