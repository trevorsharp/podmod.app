import z from 'zod';

const url = z.preprocess(
  (val) => (typeof val === 'string' && !val.match(/^https?:\/\//i) ? `https://${val}` : val),
  z
    .string()
    .regex(/^($|https:\/\/)/i, 'Must start with https://')
    .url('Must be a valid URL')
);

export default url;
