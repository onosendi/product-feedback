import type { FormApi } from 'final-form';
import type { IsEmptyOptions } from 'validator/lib/isEmpty';
import _isEmpty from 'validator/lib/isEmpty';
import type { IsLengthOptions } from 'validator/lib/isLength';
import _isLength from 'validator/lib/isLength';

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

export function isNotEqualToInitial(form: FormApi) {
  return (value: string = '') => {
    const fieldState = form.getFieldState('content');
    if (value === fieldState?.initial) {
      return 'Required';
    }
    return undefined;
  };
}
