import type { FieldState } from 'final-form';
import { useAppDispatch } from '../../../project/hooks';
import { USERNAME_EXISTS } from '../../../project/validators';
import usersApi from '../../api';

export default function useValidateUsername() {
  const dispatch = useAppDispatch();

  return async (
    value: string,
    values: Record<string, any>,
    meta: FieldState<any> | undefined,
  ) => {
    if (!meta?.pristine && value?.length >= 3) {
      const { isError } = await dispatch(
        usersApi.endpoints.getUserDetail.initiate(value),
      );
      if (!isError) {
        return USERNAME_EXISTS;
      }
    }
    return undefined;
  };
}
