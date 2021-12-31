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
import { getHasError, getHelperText, hasValidationErrors } from '../../../lib/utils';
import { composeValidators, isFilled, isLength } from '../../../lib/validators';
import { useRegisterMutation } from '../../api';
import styles from './Register.module.scss';

export default function Register() {
  useNavigateAuthorized();

  const [register] = useRegisterMutation();

  const onSubmit = async (values: APIRegister) => {
    await register(values);
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
              validate={(values) => ({
                ...(values.password !== values.passwordConfirm && {
                  passwordConfirm: 'Passwords do not match',
                }),
              })}
              render={({ form, handleSubmit, submitting }) => (
                <form className={cx(styles.form)} noValidate onSubmit={handleSubmit}>
                  <Field
                    name="username"
                    validate={composeValidators(
                      [isFilled],
                      [isLength, { min: 3 }],
                    )}
                    render={({ input, meta }) => (
                      <TextField
                        hasError={getHasError(meta)}
                        helperText={getHelperText(meta)}
                        id="username"
                        label="Username"
                        maxLength={50}
                        showCharsLeft
                        {...input}
                      />
                    )}
                  />
                  <Field
                    name="password"
                    validate={composeValidators(
                      [isFilled],
                      [isLength, { min: 6 }],
                    )}
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
                  <Field
                    name="passwordConfirm"
                    validate={composeValidators(
                      [isFilled],
                    )}
                    someOtherField="foo"
                    render={({ input, meta }) => (
                      <TextField
                        hasError={getHasError(meta)}
                        helperText={getHelperText(meta)}
                        id="passwordConfirm"
                        label="Confirm Password"
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
                    Register
                  </Button>
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
