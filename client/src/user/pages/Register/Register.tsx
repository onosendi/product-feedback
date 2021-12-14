import cx from 'clsx';
import { Field, Form } from 'react-final-form';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import {
  Button,
  Link,
  Paper,
  TextField,
} from '../../../components';
import { AuthLayout } from '../../../layouts';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import { register } from '../../redux/thunks';
import styles from './Register.module.scss';

interface OnSubmitValues {
  username: string,
  password: string,
  passwordConfirm: string,
}

export default function Register() {
  const dispatch = useDispatch();

  const onSubmit = async (values: OnSubmitValues) => {
    const { username = '', password = '', passwordConfirm = '' } = values;
    await dispatch(register(username.trim(), password, passwordConfirm));
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
                    render={({ input }) => (
                      <TextField
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
