import { z } from 'zod';

const url = z
  .string()
  .regex(/^($|http(s){0,1}:\/\/)/, 'Must start with http(s)://')
  .url('Must be a valid URL');

export default url;
