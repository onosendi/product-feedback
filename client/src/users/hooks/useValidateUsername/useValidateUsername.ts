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
      const response: any = await dispatch(
        usersApi.endpoints.validateUsername.initiate(value),
      );
      if (response?.data === true) {
        return 'Username already exists';
      }
    }
    return undefined;
  };
}
