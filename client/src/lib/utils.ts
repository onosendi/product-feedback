import type { FormApi } from 'final-form';
import type { FieldMetaState } from 'react-final-form';

export function capitalize(string: string) {
  return string.replace(
    /(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
    (letter) => letter.toUpperCase(),
  );
}

export function getFullName(firstName: string, lastName: string) {
  return [firstName, lastName].filter((name) => name).join(' ');
}

export function hasValidationErrors(form: FormApi<any>) {
  return form.getState().hasValidationErrors;
}

export function getHelperText(meta: FieldMetaState<any>) {
  return (meta.touched && meta.error) && meta.error;
}

export function getHasError(meta: FieldMetaState<any>) {
  return meta.touched && meta.error;
}
