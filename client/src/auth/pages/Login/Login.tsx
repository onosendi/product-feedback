import cx from 'clsx';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Helmet } from 'react-helmet-async';
import {
  Button,
  Link,
  Paper,
  TextField,
} from '../../../project/components';
import { APP_NAME } from '../../../project/constants';
import status from '../../../project/httpStatusCodes';
import { AuthLayout } from '../../../project/layouts';
import routes from '../../../project/routes';
import { getHasError, getHelperText, hasValidationErrors } from '../../../project/utils';
import { isFilled } from '../../../project/validators';
import { useLoginMutation } from '../../api';
import { useNavigateAuthorized } from '../../hooks';
import styles from './Login.module.scss';

export default function Login() {
  useNavigateAuthorized();

  const [errors, setErrors] = useState(false);
  const [login] = useLoginMutation();

  const onSubmit = async (values: Record<string, any>) => {
    setErrors(false);
    try {
      await login({
        username: values.username,
        password: values.password,
      }).unwrap();
    } catch (error) {
      const err = error as any;
      if (err?.status === status.HTTP_401_UNAUTHORIZED) {
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
              render={({
                form,
                handleSubmit,
                pristine,
                submitting,
              }) => (
                <form className={cx(styles.form)} noValidate onSubmit={handleSubmit}>
                  <Field
                    name="username"
                    validate={isFilled}
                    render={({ input, meta }) => (
                      <TextField
                        hasError={getHasError(meta)}
                        helperText={getHelperText(meta)}
                        id="username"
                        label="Username"
                        {...input}
                      />
                    )}
                  />
                  <Field
                    name="password"
                    validate={isFilled}
                    render={({ input, meta }) => (
                      <TextField
                        hasError={getHasError(meta)}
                        helperText={getHelperText(meta)}
                        id="password"
                        label="Password"
                        type="password"
                        {...input}
                      />
                    )}
                  />
                  <Button
                    disabled={pristine || submitting || hasValidationErrors(form)}
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
