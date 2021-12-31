// TODO: Registration validation
import type { APIRegister } from '@t/api';
import cx from 'clsx';
import { Field, Form } from 'react-final-form';
import { Helmet } from 'react-helmet-async';
import { useNavigateAuthorized } from '../../../auth/hooks';
import {
  Button,
  Link,
  Paper,
  TextField,
} from '../../../components';
import { AuthLayout } from '../../../layouts';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import styles from './Register.module.scss';

const required = (value: any) => {
  console.log(value);
  return value ? undefined : 'Required';
};

export default function Register() {
  useNavigateAuthorized();

  const onSubmit = async (values: APIRegister) => {
    const { username = '', password = '', passwordConfirm = '' } = values;
  };

  return (
    <>
      <Helmet>
        <title>{`Register - ${APP_NAME}`}</title>
      </Helmet>
      <AuthLayout>
        <main>
          <Paper className={cx(styles.paper)}>
            <h1 className={cx('type-1', styles.heading)}>Register</h1>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, values }) => (
                <form className={cx(styles.form)} noValidate onSubmit={handleSubmit}>
                  <Field
                    name="username"
                    render={({ input, meta }) => (
                      <TextField
                        error={meta.error && meta.touched}
                        helperText={(meta.error && meta.touched) && meta.error}
                        id="username"
                        label="Username"
                        maxLength={50}
                        showCharsLeft
                        {...input}
                      />
                    )}
                    validate={required}
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
                  <Field
                    name="passwordConfirm"
                    render={({ input }) => (
                      <TextField
                        id="passwordConfirm"
                        label="Confirm Password"
                        type="password"
                        {...input}
                      />
                    )}
                  />
                  <Button fullWidth type="submit" variant="1">Register</Button>
                </form>
              )}
            />
          </Paper>
          <p className={cx('type-body2', styles.login)}>
            {'Already registered? '}
            <Link href={routes.auth.login}>Login</Link>
            {', or go '}
            <Link href={routes.index}>home</Link>
            .
          </p>
        </main>
      </AuthLayout>
    </>
  );
}
