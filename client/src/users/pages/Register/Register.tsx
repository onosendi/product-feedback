// TODO: put form into its own component
import cx from 'clsx';
import { Field, Form } from 'react-final-form';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useNavigateAuthorized } from '../../../auth/hooks';
import {
  Button,
  Link,
  Paper,
  TextField,
} from '../../../project/components';
import { AuthLayout } from '../../../project/layouts';
import { APP_NAME } from '../../../project/constants';
import routes from '../../../project/routes';
import { getHasError, getHelperText, hasValidationErrors } from '../../../project/utils';
import {
  composeValidators,
  isFilled,
  isLength,
  simpleMemoize,
} from '../../../project/validators';
import usersApi, { useRegisterMutation } from '../../api';
import styles from './Register.module.scss';

export default function Register() {
  useNavigateAuthorized();

  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  const onSubmit = async (values: Record<string, any>) => {
    await register({
      username: values.username,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    });
  };

  // TODO: debounce this
  const validateUsername = simpleMemoize(async (username: string) => {
    if (username.length >= 3) {
      // TODO
      const response: any = await dispatch(
        usersApi.endpoints.validateUsername.initiate(username),
      );
      if (response?.data === true) {
        return 'Username already exists';
      }
    }
    return undefined;
  });

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
              render={({
                form,
                handleSubmit,
                pristine,
                submitting,
              }) => (
                <form className={cx(styles.form)} noValidate onSubmit={handleSubmit}>
                  <Field
                    name="username"
                    validate={composeValidators(
                      [isFilled],
                      [isLength, { min: 3 }],
                      [validateUsername],
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
                    disabled={pristine || submitting || hasValidationErrors(form)}
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
