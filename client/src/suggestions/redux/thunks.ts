import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import api from '../../lib/api';
import desc from '../descriptors';
import { actSetList } from './slice';

export function getSuggestions() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await api(desc.list());
    dispatch(actSetList(response));
  };
}
