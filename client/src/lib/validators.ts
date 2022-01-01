import type { IsEmptyOptions } from 'validator/lib/isEmpty';
import _isEmpty from 'validator/lib/isEmpty';
import type { IsLengthOptions } from 'validator/lib/isLength';
import _isLength from 'validator/lib/isLength';

export function composeValidators(
  ...validators: [
    ((value: string, options?: any) => string | undefined),
    object?,
  ][]
) {
  return (value: string) => validators.reduce(
    (error: string | undefined, [validator, options]) => (
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
