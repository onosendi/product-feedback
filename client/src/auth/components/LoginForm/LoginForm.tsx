import cx from 'clsx';
import { FORM_ERROR } from 'final-form';
import { Field, Form } from 'react-final-form';
import { object as yupObject, string as yupString } from 'yup';
import { Button, TextField } from '../../../project/components';
import status from '../../../project/httpStatusCodes';
import { getHasError, getHelperText } from '../../../project/utils';
import { REQUIRED, validateFormValues } from '../../../project/validators';
import { useLoginMutation } from '../../api';
import styles from './LoginForm.module.scss';

const validationSchema = yupObject({
  username: yupString().required(REQUIRED).trim(),
  password: yupString().required(REQUIRED),
});

export default function LoginForm() {
  const [login] = useLoginMutation();

  const onSubmit = async (values: Record<string, any>) => {
    try {
      await login({
        username: values.username.trim(),
        password: values.password,
      }).unwrap();
    } catch (error) {
      const err = error as any;
      if (err?.status === status.HTTP_401_UNAUTHORIZED) {
        return { [FORM_ERROR]: true };
      }
    }
    return undefined;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validateFormValues(validationSchema)}
      render={({
        handleSubmit,
        pristine,
        submitErrors,
        submitting,
        valid,
      }) => (
        <>
          {submitErrors && (
            <p className={cx('type-jost-semibold', styles.error)}>
              Invalid username or password
            </p>
          )}
          <form className={cx(styles.form)} noValidate onSubmit={handleSubmit}>
            <Field
              name="username"
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
              disabled={pristine || submitting || (!valid && !submitErrors)}
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
  );
}
