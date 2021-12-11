import { AxiosError } from 'axios';
import cx from 'clsx';
import { FormEvent, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Link,
  Paper,
  TextField,
} from '../../../components';
import api from '../../../lib/api';
import status from '../../../lib/httpStatusCodes';
import routes from '../../../lib/routes';
import desc from '../../descriptors';
import styles from './Login.module.scss';

export default function Login() {
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (values: { username: string, password: string }) => {
    console.log(values);
  };

  // const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const { username, password } = event.currentTarget;

  //   try {
  //     setErrors(false);
  //     await api(desc.token(username.value, password.value));
  //     // navigate(routes.feedback.index);
  //   } catch (err: unknown) {
  //     const error = err as AxiosError;
  //     if (error?.response?.status === status.HTTP_401_UNAUTHORIZED) {
  //       setErrors(true);
  //     }
  //   }
  // };

  return (
    <main>
      <Paper className={cx(styles.paper)}>
        <h1 className={cx('type-1', styles.heading)}>Login</h1>
        {errors && (
          <p className={cx('type-jost-semibold', styles.error)}>Invalid username or password</p>
        )}
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, values }) => (
            <>
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
            </>
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
  );
}
