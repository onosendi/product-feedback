import type { FieldMetaState } from 'react-final-form';

export function capitalize(string: string): string {
  return string.replace(
    /(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
    (letter) => letter.toUpperCase(),
  );
}

export function getFullName(firstName: string, lastName: string): string {
  return [firstName, lastName].filter((name) => name).join(' ');
}

// TODO Use `valid` from form render props instead of `hasValidationErrors`
export function hasValidationErrors(form: any): boolean {
  return form.getState().hasValidationErrors;
}

export function getHelperText(meta: FieldMetaState<any>): undefined | string {
  return (
    (meta.touched && meta.error)
    || meta.submitError
  ) && (meta.error || meta.submitError);
}

export function getHasError(meta: FieldMetaState<any>): boolean {
  return (meta.touched && meta.error) || meta.submitError;
}

export function pluralize(string: string, count: number) {
  return (count === 1 ? string : `${string}s`);
}
