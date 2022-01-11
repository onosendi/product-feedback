import type { UserResponse } from '@t/response';
import cx from 'clsx';
import { FORM_ERROR } from 'final-form';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { object as yupObject, string as yupString } from 'yup';
import { Picture } from '..';
import {
  Button,
  DebouncedMemoizedFormField,
  FormError,
  Paper,
  TextField,
} from '../../../project/components';
import {
  getFullName,
  getHasError,
  getHelperText,
} from '../../../project/utils';
import {
    INVALID_PASSWORD,
  passwordConfirmValidator,
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
  password: yupString()
    .min(6, 'Must have at least 6 characters')
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
  const fullName = getFullName(user.firstName, user.lastName);

  const validateUsername = useValidateUsername();
  const [editUser] = useEditUserMutation();

  // TODO
  const onSubmit = async (values: Record<string, any>) => {
    const body = {
      currentPassword: values.currentPassword,
      email: values.email?.trim(),
      firstName: values.firstName?.trim(),
      lastName: values.lastName?.trim(),
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      username: values.username,
    };

    try {
      await editUser(body).unwrap();
      // TODO: toast
    } catch (error) {
      const err = error as any;
      if (err?.data?.message === INVALID_PASSWORD) {
        return {
          currentPassword: INVALID_PASSWORD,
          [FORM_ERROR]: true,
        };
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
      }) => (
        <form
          className={cx(styles.form)}
          noValidate
          onSubmit={handleSubmit}
        >
          <Paper className={cx(styles.paper)}>
            <fieldset>
              <legend className={cx('type-1', styles.legend)}>Account</legend>
              <div className={cx(styles.textFieldWrapper)}>
                <DebouncedMemoizedFormField
                  name="username"
                  initialValue={user.username}
                  validate={validateUsername}
                  // TODO
                  render={({ input, meta }: any) => (
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
                  initialValue={user.firstName}
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
                  initialValue={user.lastName}
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
                    initialValue={user.email}
                    render={({ input, meta }) => (
                      <TextField
                        defaultValue={user.email}
                        hasError={getHasError(meta)}
                        helperText={getHelperText(meta)}
                        id="email"
                        label="Email Address"
                        labelClassName={cx(styles.fileLabel)}
                        maxLength={254}
                        type="email"
                        {...input}
                      />
                    )}
                  />
                  <Picture
                    // TODO: have hash be a part of auth object
                    alt={fullName || user.username}
                    className={cx(styles.userPicture)}
                    emailHash={user.emailHash}
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