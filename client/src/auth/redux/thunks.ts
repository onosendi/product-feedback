import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import api from '../../lib/api';
import desc from '../descriptors';
import { actSetAuth } from './slice';

export const login = (
  username: string,
  password: string,
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await api(desc.login(username, password));
  dispatch(actSetAuth(response));
};
