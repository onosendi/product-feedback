import api from '../../lib/api';
import { Dispatch } from '../../lib/types/redux';
import desc from '../descriptors';
import { actSetAuth } from './slice';

export const loginThunk = (
  username: string,
  password: string,
) => async (dispatch: Dispatch) => {
  const { token } = await api(desc.login(username, password));
  dispatch(actSetAuth({ token, username }));
};
