// TODO: remove this and validatorjs from packages
import type { FormApi } from 'final-form';
import { setIn } from 'final-form';
import type { IsEmailOptions } from 'validator/lib/isEmail';
import _isEmail from 'validator/lib/isEmail';
import type { IsEmptyOptions } from 'validator/lib/isEmpty';
import _isEmpty from 'validator/lib/isEmpty';
import type { IsLengthOptions } from 'validator/lib/isLength';
import _isLength from 'validator/lib/isLength';
import {
    AnySchema,
  string as yupString, ValidationError,
} from 'yup';

// TODO
export function simpleMemoize(fn: any) {
  let lastValue: string;
  let lastResult: any;
  return (value: string) => {
    if (value !== lastValue) {
      lastValue = value;
      lastResult = fn(value);
    }
    return lastResult;
  };
}

// TODO: fix this to work with `validateUsername`.
export function composeValidators(...validators: any) {
  return (value: string) => validators.reduce(
    (error: string | undefined, [validator, options]: any) => (
      error || validator(value, options)
    ),
    undefined,
  );
}

export function isFilled(value: string = '', options?: IsEmptyOptions) {
  return _isEmpty(value.trim(), options) ? 'Required' : undefined;
}

export function isLength(value: string = '', options?: IsLengthOptions) {
  const message = options?.min
    ? `Must be at least ${options?.min} characters`
    : `Can't be more than ${options?.max} characters`;
  return _isLength(value.trim(), options) ? undefined : message;
}

export function isEmail(value: string = '', options?: IsEmailOptions) {
  return _isEmail(value.trim(), options) && value !== '' ? undefined : 'Invalid email address';
}

export function isNotEqualToInitial(fieldName: string, form: FormApi) {
  return (value: string = '') => {
    const fieldState = form.getFieldState(fieldName);
    if (value === fieldState?.initial) {
      return 'Required';
    }
    return undefined;
  };
}

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
  .max(50, 'Can\'t be more than 50 characters')
  .trim();

export const passwordValidator = yupString()
  .min(6, 'Must have at least 6 characters');

export const passwordConfirmValidator = yupString()
  .test('', 'Passwords do not match', function (value) {
    return value === this.parent.password;
  });
