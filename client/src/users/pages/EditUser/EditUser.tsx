import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { Button, Paper, TextField } from '../../../project/components';
import { Picture } from '../../components';
import styles from './EditUser.module.scss';

export default function EditUser() {
  return (
    <>
      <Helmet>
        <title>{`${user.username} - ${APP_NAME}`}</title>
      </Helmet>
      <form
        className={cx(styles.form)}
        noValidate
        onSubmit={onSubmit}
        ref={formRef}
      >
        <Paper className={cx(styles.paper)}>
          <fieldset>
            <legend className={cx('type-1', styles.legend)}>Account</legend>
            <div className={cx(styles.textFieldWrapper)}>
              <TextField
                defaultValue={user.username}
                id="username"
                label="Username"
                name="username"
                maxLength={50}
              />
              <TextField
                defaultValue={user.firstName}
                id="first-name"
                label="First Name"
                name="firstName"
                maxLength={50}
              />
              <TextField
                defaultValue={user.lastName}
                id="last-name"
                label="Last Name"
                name="lastName"
                maxLength={50}
              />
              <div className={cx(styles.userPictureWrapper)}>
                <Picture
                  alt={fullName || user.username}
                  className={cx(styles.userPicture)}
                  src={user.picture}
                />
              </div>
            </div>
          </fieldset>
        </Paper>
        <Paper className={cx(styles.paper)}>
          <fieldset>
            <legend className={cx('type-1', styles.legend)}>Security</legend>
            <div className={cx(styles.textFieldWrapper)}>
              <TextField
                id="current-password"
                label="Current Password"
                name="currentPassword"
                showCharsLeft={false}
                type="password"
              />
              <TextField
                id="new-password"
                label="New Password"
                name="newPassword"
                showCharsLeft={false}
                type="password"
              />
              <TextField
                id="passwordConfirm"
                label="Confirm New Password"
                name="passwordConfirm"
                showCharsLeft={false}
                type="password"
              />
            </div>
          </fieldset>
        </Paper>
        <div className={cx(styles.buttonWrapper)}>
          <Button type="submit" variant="1">Save Changes</Button>
        </div>
      </form>
    </>
  );
}
