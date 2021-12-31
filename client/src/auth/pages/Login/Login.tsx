import type { APILogin } from '@t/api';
import cx from 'clsx';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Helmet } from 'react-helmet-async';
import { hasValidationErrors } from 'src/lib/utils';
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
    try {
      await login(values).unwrap();
    } catch (error) {
      const err = error as any;
      if ([status.HTTP_401_UNAUTHORIZED, status.HTTP_400_BAD_REQUEST].includes(err?.status)) {
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
              render={({ handleSubmit, submitting, form }) => (
                <form className={cx(styles.form)} noValidate onSubmit={handleSubmit}>
                  <Field
                    name="username"
                    render={({ input, meta }) => (
                      <TextField
                        hasError={meta.touched && meta.error}
                        helperText={(meta.touched && meta.error) && meta.error}
                        id="username"
                        label="Username"
                        {...input}
                      />
                    )}
                  />
                  <Field
                    name="password"
                    render={({ input, meta }) => (
                      <TextField
                        hasError={meta.touched && meta.error}
                        helperText={(meta.touched && meta.error) && meta.error}
                        id="password"
                        label="Password"
                        type="password"
                        {...input}
                      />
                    )}
                  />
                  <Button
                    disabled={submitting || hasValidationErrors(form)}
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
