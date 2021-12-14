import cx from 'clsx';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Link,
  Paper,
  TextField,
} from '../../../components';
import status from '../../../lib/httpStatusCodes';
import routes from '../../../lib/routes';
import { selectIsAuthenticated } from '../../redux/selectors';
import { loginThunk } from '../../redux/thunks';
import styles from './Login.module.scss';

export default function Login() {
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onSubmit = async (values: { username: string, password: string }) => {
    setErrors(false);
    const { username = '', password = '' } = values;

    try {
      await dispatch(loginThunk(username.trim(), password));
    } catch (error: any) {
      if (error?.response?.status === status.HTTP_401_UNAUTHORIZED) {
        setErrors(true);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(state?.path || routes.index);
    }
  }, [isAuthenticated, navigate, state?.path]);

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
  );
}
