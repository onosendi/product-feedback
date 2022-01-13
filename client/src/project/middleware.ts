import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export const rtkQueryErrorHandler: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error(action.payload);
  }
  return next(action);
};
