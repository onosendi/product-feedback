import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { useDispatch } from 'react-redux';
import usersApi from '../../api';

export default function useValidateUsername() {
  const dispatch = useDispatch();

  return async (
    value: string,
    values: Record<string, any>,
    // TODO
    meta: any,
  ) => {
    if (!meta.pristine && value?.length >= 3) {
      // TODO
      const { isError } = await dispatch(
        usersApi.endpoints.getUserDetail.initiate(value),
      ) as any;
      if (!isError) {
        return 'Username already exists';
      }
    }
    return undefined;
  };
}
