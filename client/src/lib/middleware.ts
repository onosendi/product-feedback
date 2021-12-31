import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export const rtkQueryErrorHandler: Middleware = (
  api: MiddlewareAPI,
) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // TODO: toast 500 errors?
    console.error(action.payload);
  }
  return next(action);
};
