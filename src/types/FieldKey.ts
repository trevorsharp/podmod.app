import type { FieldValuesFromFieldErrors } from '@hookform/error-message';
import type { FieldErrors, FieldName, FieldPath, FieldValues } from 'react-hook-form';

type FieldKey<T extends FieldValues> = FieldPath<T> &
  FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;

export type { FieldKey };
