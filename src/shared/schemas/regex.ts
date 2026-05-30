import z from "zod";

const regex = z
  .string()
  .min(1, "Must contain at least 1 character")
  .refine(
    (regex) => {
      try {
        new RegExp(regex);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Must be a valid regex",
    },
  );

export default regex;
