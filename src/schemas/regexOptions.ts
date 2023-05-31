import { z } from 'zod';

const regexOptions = z.string().refine(
  (regexOptions) => {
    try {
      new RegExp('.', regexOptions);
      return true;
    } catch {
      return false;
    }
  },
  {
    message: 'Invalid regular expression options',
  }
);

export default regexOptions;
