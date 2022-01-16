import React, { useRef } from 'react';
import type { FieldProps } from 'react-final-form';
import { Field } from 'react-final-form';

type DebouncedMemoizedFormFieldProps = FieldProps<any, any> & {
  milliseconds?: number,

  // TODO
  validate: any,
};

export default function DebouncedMemoizedFormField({
  milliseconds = 400,
  validate,
  ...props
}: DebouncedMemoizedFormFieldProps) {
  const timeout = useRef<any>(null);
  const lastValue = useRef<any>(null);
  const lastResult = useRef<any>(null);

  const validateField = (value: any, values: any, meta: any) => new Promise((resolve) => {
    if (timeout.current) {
      timeout.current();
    }

    if (value !== lastValue.current) {
      const timerId = setTimeout(() => {
        lastValue.current = value;
        lastResult.current = validate(value, values, meta);
        resolve(lastResult.current);
      }, milliseconds);

      timeout.current = () => {
        clearTimeout(timerId);
        resolve(true);
      };
    } else {
      resolve(lastResult.current);
    }
  });

  return <Field validate={validateField} {...props} />;
}
