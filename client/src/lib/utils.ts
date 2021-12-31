import type { FormApi, FormState } from 'final-form';

export function capitalize(string: string) {
  return string.replace(
    /(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
    (letter) => letter.toUpperCase(),
  );
}

export function getFullName(firstName: string, lastName: string) {
  return [firstName, lastName].filter((name) => name).join(' ');
}

export function hasValidationErrors(form: FormApi<any, any>) {
  return form.getState().hasValidationErrors;
}
