import cx from 'clsx';
import { Field, Form } from 'react-final-form';
import { object as yupObject } from 'yup';
import { Button, DebouncedMemoizedFormField, TextField } from '../../../project/components';
import { getHasError, getHelperText } from '../../../project/utils';
import {
  passwordConfirmValidator,
  passwordValidator,
  REQUIRED,
  usernameValidator,
  validateFormValues,
} from '../../../project/validators';
import { useRegisterMutation } from '../../api';
import { useValidateUsername } from '../../hooks';
import styles from './RegisterForm.module.scss';

const validationSchema = yupObject({
  username: usernameValidator,
  password: passwordValidator.required(REQUIRED),
  passwordConfirm: passwordConfirmValidator,
});

export default function RegisterForm() {
  const validateUsername = useValidateUsername();
  const [register] = useRegisterMutation();

  const onSubmit = async (values: Record<string, any>) => {
    await register({
      username: values.username,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validateFormValues(validationSchema)}
      render={({
        handleSubmit,
        pristine,
        submitting,
        valid,
      }) => (
        <form className={cx(styles.form)} noValidate onSubmit={handleSubmit}>
          <DebouncedMemoizedFormField
            name="username"
            validate={validateUsername}
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
            disabled={pristine || submitting || !valid}
            fullWidth
            type="submit"
            variant="1"
          >
            Register
          </Button>
        </form>
      )}
    />
  );
}
