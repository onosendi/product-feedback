import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import api from '../../lib/api';
import desc from '../descriptors';
import { actSetAuth } from '../../auth/redux/slice';

export function register(
  username: string,
  password: string,
  passwordConfirm: string,
) {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const response = await api(desc.register(username, password, passwordConfirm));
      dispatch(actSetAuth(response));
    } catch (error: any) {
      const data = error?.response?.data;
      if (data) {
        console.error(data);
      }
    }
  };
}
