import { useAppDispatch } from '../../../project/hooks';
import usersApi from '../../api';

export default function useValidateUsername() {
  const dispatch = useAppDispatch();

  return async (
    value: string,
    values: Record<string, any>,
    // TODO
    meta: any,
  ) => {
    if (!meta.pristine && value?.length >= 3) {
      const { isError } = await dispatch(
        usersApi.endpoints.getUserDetail.initiate(value),
      );
      if (!isError) {
        return 'Username already exists';
      }
    }
    return undefined;
  };
}
