type LabelProps = {
  id: string;
  children: React.ReactNode;
};

const Label = ({ id, children }: LabelProps) => (
  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor={id}>
    {children}
  </label>
);

export default Label;
