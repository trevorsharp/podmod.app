import { z } from 'zod';

const url = z.preprocess(
  (val) => (typeof val === 'string' && !val.match(/^http(s){0,1}:\/\//i) ? `http://${val}` : val),
  z
    .string()
    .regex(/^($|http(s){0,1}:\/\/)/i, 'Must start with http(s)://')
    .url('Must be a valid URL')
);

export default url;
