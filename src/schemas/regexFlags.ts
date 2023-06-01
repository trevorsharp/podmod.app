import { z } from 'zod';

const regexFlags = z.string().refine(
  (flags) => {
    try {
      new RegExp('.', flags);
      return true;
    } catch {
      return false;
    }
  },
  {
    message: 'Must be valid regex flags',
  }
);

export default regexFlags;
