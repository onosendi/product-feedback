import type { UserResponse } from '@t/response';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../auth/hooks';
import { DelayChildren, Error404, Loader } from '../../../project/components';
import { APP_NAME } from '../../../project/constants';
import { FormLayout } from '../../../project/layouts';
import { useGetUserDetailQuery } from '../../api';
import { EditUserForm } from '../../components';

export default function EditUser() {
  const { username } = useAuth();
  const {
    data: user = {} as UserResponse,
    isFetching,
  } = useGetUserDetailQuery(username as string);

  if (isFetching) {
    return (
      <DelayChildren>
        <Loader fullscreen />
      </DelayChildren>
    );
  }

  if (!Object.entries(user).length) {
    return <Error404 />;
  }

  return (
    <>
      <Helmet>
        <title>{`${user.username} - ${APP_NAME}`}</title>
      </Helmet>
      <FormLayout>
        <EditUserForm user={user} />
      </FormLayout>
    </>
  );
}
