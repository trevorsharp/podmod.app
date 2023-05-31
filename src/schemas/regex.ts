import { z } from 'zod';

const regex = z.string().refine(
  (regex) => {
    try {
      new RegExp(regex);
      return true;
    } catch {
      return false;
    }
  },
  {
    message: 'Invalid regular expression',
  }
);

export default regex;
