export const getValue = <T extends string | { cdata: string } | undefined>(
  rawValue: T
): T extends undefined ? string | undefined : string =>
  rawValue && (typeof rawValue === 'string' ? rawValue : rawValue.cdata);
