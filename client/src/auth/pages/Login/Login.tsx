import type { APILogin } from '@t/api';
import cx from 'clsx';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Helmet } from 'react-helmet-async';
import {
  Button,
  Link,
  Paper,
  TextField,
} from '../../../components';
import { AuthLayout } from '../../../layouts';
import { APP_NAME } from '../../../lib/constants';
import status from '../../../lib/httpStatusCodes';
import routes from '../../../lib/routes';
import { useLoginMutation } from '../../api';
import { useNavigateAuthorized } from '../../hooks';
import styles from './Login.module.scss';

export default function Login() {
  useNavigateAuthorized();

  const [errors, setErrors] = useState(false);
  const [login] = useLoginMutation();

  const onSubmit = async (values: APILogin) => {
    setErrors(false);
    const { username = '', password = '' } = values;

    try {
      await login({ username, password }).unwrap();
    } catch (error: any) {
      if (error?.status === status.HTTP_401_UNAUTHORIZED) {
        setErrors(true);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Login - ${APP_NAME}`}</title>
      </Helmet>
      <AuthLayout>
        <main>
          <Paper className={cx(styles.paper)}>
            <h1 className={cx('type-1', styles.heading)}>Login</h1>
            {errors && (
              <p className={cx('type-jost-semibold', styles.error)}>Invalid username or password</p>
            )}
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, values }) => (
                <form className={cx(styles.form)} noValidate onSubmit={handleSubmit}>
                  <Field
                    name="username"
                    render={({ input }) => (
                      <TextField
                        id="username"
                        label="Username"
                        {...input}
                      />
                    )}
                  />
                  <Field
                    name="password"
                    render={({ input }) => (
                      <TextField
                        id="password"
                        label="Password"
                        type="password"
                        {...input}
                      />
                    )}
                  />
                  <Button
                    disabled={submitting}
                    fullWidth
                    type="submit"
                    variant="1"
                  >
                    Login
                  </Button>
                </form>
              )}
            />
          </Paper>
          <p className={cx('type-body2', styles.register)}>
            {'Not registered? '}
            <Link href={routes.user.register}>Register</Link>
            {', or go '}
            <Link href={routes.index}>home</Link>
            .
          </p>
        </main>
      </AuthLayout>
    </>
  );
}
