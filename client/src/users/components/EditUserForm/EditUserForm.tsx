import type { UserResponse } from '@t/response';
import cx from 'clsx';
import { FORM_ERROR } from 'final-form';
import { useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import toast from 'react-hot-toast';
import { object as yupObject, string as yupString } from 'yup';
import { Picture } from '..';
import { useAuth } from '../../../auth/hooks';
import {
  Button,
  DebouncedMemoizedFormField,
  FormError,
  Paper,
  TextField,
} from '../../../project/components';
import { getFullName, getHasError, getHelperText } from '../../../project/utils';
import {
  INVALID_PASSWORD,
  passwordConfirmValidator,
  passwordValidator,
  REQUIRED,
  usernameValidator,
  validateFormValues,
} from '../../../project/validators';
import { useEditUserMutation } from '../../api';
import { useValidateUsername } from '../../hooks';
import styles from './EditUserForm.module.scss';

const validationSchema = yupObject({
  username: usernameValidator,
  firstName: yupString().max(50, 'Can\'t be more than 50 characters').trim(),
  lastName: yupString().max(50, 'Can\'t be more than 50 characters').trim(),
  email: yupString().email('Invalid email address').trim(),
  currentPassword: yupString()
    .test('', REQUIRED, function (value) {
      return !(!value && (this.parent.password || this.parent.passwordConfirm));
    }),
  password: passwordValidator
    .test('', REQUIRED, function (value) {
      return !(!value && (this.parent.currentPassword || this.parent.passwordConfirm));
    }),
  passwordConfirm: passwordConfirmValidator
    .test('', REQUIRED, function (value) {
      return !(!value && (this.parent.password || this.parent.currentPassword));
    }),
});

type EditUserFormProps = {
  user: UserResponse,
};

export default function EditUserForm({
  user,
}: EditUserFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [initialValues, setInitialValues] = useState({
    username: user.username,
    firstName: user.firstName || undefined,
    lastName: user.lastName || undefined,
    email: user.email || undefined,
    currentPassword: undefined,
    password: undefined,
    passwordConfirm: undefined,
  });
  const { emailHash } = useAuth();
  const fullName = getFullName(user.firstName, user.lastName);

  const validateUsername = useValidateUsername();
  const [editUser] = useEditUserMutation();

  const clearPasswordFields = () => {
    setInitialValues({
      ...initialValues,
      currentPassword: undefined,
      password: undefined,
      passwordConfirm: undefined,
    });
    if (formRef.current) {
      formRef.current.currentPassword.value = '';
      formRef.current.password.value = '';
      formRef.current.passwordConfirm.value = '';
    }
  };

  const onSubmit = async (values: Record<string, any>) => {
    try {
      const data = {
        currentPassword: values.currentPassword,
        email: values.email?.trim(),
        firstName: values.firstName?.trim(),
        lastName: values.lastName?.trim(),
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        username: values.username,
      };

      await editUser(data).unwrap();

      setInitialValues(data);

      clearPasswordFields();

      toast.success('User info saved');
    } catch (error) {
      const err = error as any;
      const errors = {} as Record<string, string>;
      if (err?.data?.message === INVALID_PASSWORD) {
        errors.currentPassword = INVALID_PASSWORD;
      }
      if (Object.entries(errors).length) {
        return { ...errors, [FORM_ERROR]: true };
      }
    }

    return undefined;
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateFormValues(validationSchema)}
      render={({
        handleSubmit,
        pristine,
        submitErrors,
        submitting,
      }) => (
        <form
          className={cx(styles.form)}
          noValidate
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Paper className={cx(styles.paper)}>
            <fieldset>
              <legend className={cx('type-1', styles.legend)}>Account</legend>
              <div className={cx(styles.textFieldWrapper)}>
                <DebouncedMemoizedFormField
                  name="username"
                  validate={validateUsername}
                  render={({ input, meta }) => (
                    <TextField
                      defaultValue={user.username}
                      hasError={getHasError(meta)}
                      helperText={getHelperText(meta)}
                      id="username"
                      label="Username"
                      maxLength={50}
                      {...input}
                    />
                  )}
                />
                <Field
                  name="firstName"
                  render={({ input, meta }) => (
                    <TextField
                      defaultValue={user.firstName}
                      hasError={getHasError(meta)}
                      helperText={getHelperText(meta)}
                      id="first-name"
                      label="First Name"
                      maxLength={50}
                      {...input}
                    />
                  )}
                />
                <Field
                  name="lastName"
                  render={({ input, meta }) => (
                    <TextField
                      defaultValue={user.lastName}
                      hasError={getHasError(meta)}
                      helperText={getHelperText(meta)}
                      id="last-name"
                      label="Last Name"
                      maxLength={50}
                      {...input}
                    />
                  )}
                />
                <div className={cx(styles.userPictureWrapper)}>
                  <Field
                    name="email"
                    render={({ input, meta }) => (
                      <TextField
                        defaultValue={user.email}
                        description="Used to generate your profile picture"
                        hasError={getHasError(meta)}
                        helperText={getHelperText(meta)}
                        id="email"
                        label="Gravatar Email Address"
                        labelClassName={cx(styles.emailLabel)}
                        maxLength={254}
                        type="email"
                        {...input}
                      />
                    )}
                  />
                  <Picture
                    alt={fullName || user.username}
                    className={cx(styles.userPicture)}
                    emailHash={emailHash}
                  />
                </div>
              </div>
            </fieldset>
          </Paper>
          <Paper className={cx(styles.paper)}>
            <fieldset>
              <legend className={cx('type-1', styles.legend)}>Security</legend>
              <div className={cx(styles.textFieldWrapper)}>
                <Field
                  name="currentPassword"
                  render={({ input, meta }) => (
                    <TextField
                      hasError={getHasError(meta)}
                      helperText={getHelperText(meta)}
                      id="current-password"
                      label="Current Password"
                      showCharsLeft={false}
                      type="password"
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
                      id="new-password"
                      label="New Password"
                      showCharsLeft={false}
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
                      label="Confirm New Password"
                      showCharsLeft={false}
                      type="password"
                      {...input}
                    />
                  )}
                />
              </div>
            </fieldset>
          </Paper>
          {submitErrors && <FormError />}
          <div className={cx(styles.buttonWrapper)}>
            <Button
              disabled={submitting || pristine}
              type="submit"
              variant="1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      )}
    />
  );
}
