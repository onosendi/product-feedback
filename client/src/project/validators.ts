import { setIn } from 'final-form';
import type { AnySchema, ValidationError } from 'yup';
import { string as yupString } from 'yup';

export function getSchemaValidationErrors(
  schema: AnySchema,
  values: Record<string, any>,
) {
  try {
    schema.validateSync(values, { abortEarly: false });
  } catch (error) {
    const err = error as ValidationError;
    return err.inner.reduce((acc, validationError) => (
      setIn(acc, validationError.path as string, validationError.message)), {});
  }
  return {};
}

export function validateFormValues(schema: any) {
  const s = typeof schema === 'function' ? schema() : schema;
  return (values: Record<string, any>) => getSchemaValidationErrors(s, values);
}

export const REQUIRED = 'This field is required';
export const INVALID_PASSWORD = 'Invalid password';
export const USERNAME_EXISTS = 'Username already exists';

export const usernameValidator = yupString()
  .required(REQUIRED)
  .min(3, 'Must be at least 3 characters')
  .matches(/^[a-zA-Z]+([_-]?[a-zA-Z0-9])*$/, 'Invalid username')
  .max(50, 'Can\'t be more than 50 characters')
  .trim();

export const passwordValidator = yupString()
  .min(6, 'Must have at least 6 characters');

export const passwordConfirmValidator = yupString()
  .test('', 'Passwords do not match', function (value) {
    return value === this.parent.password;
  });
