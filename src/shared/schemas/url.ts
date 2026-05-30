import z from "zod";

const url = z.preprocess(
  (val) =>
    typeof val === "string" && !/^https:\/\//i.exec(val)
      ? `https://${val.replace("http://", "")}`
      : val,
  z
    .string()
    .regex(/^($|https:\/\/)/i, "Must start with https://")
    .url("Must be a valid URL"),
);

export default url;
