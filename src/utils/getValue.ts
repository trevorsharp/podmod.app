import type { StringOrCDATA } from '@/types/StringOrCDATA';

export const getValue = <T extends StringOrCDATA | undefined>(
  rawValue: T
): T extends undefined ? string | undefined : string =>
  rawValue && (typeof rawValue === 'string' ? rawValue : rawValue.cdata);
