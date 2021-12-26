import cx from 'clsx';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/auth/hooks';
import {
  Button,
  Dialog,
  Paper,
  SelectField,
  SelectItem,
  TextField,
} from '../../../components';
import styles from './CreateOrUpdate.module.scss';

export default function CreateOrUpdate() {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const { role } = useAuth();
  const isNew = true;

  const cancel = () => {
    navigate(-1);
  };

  // @ts-ignore
  const onSubmit = async (values) => {};

  const deleteFeedback = async () => {};

  const toggleDeleteDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <Paper className={cx(styles.paper)} component="main">
      {showDialog && (
        <Dialog
          onClose={toggleDeleteDialog}
          onProceed={deleteFeedback}
        >
          Are you sure you want to delete this feedback?
        </Dialog>
      )}
      <span className={cx(styles.icon, isNew ? styles.iconNew : styles.iconEdit)} />
      <h1 className={cx('type-1', styles.heading)}>
        {isNew
          ? 'Create New Feedback'
          // TODO
          : 'Editing \'TODO\''}
      </h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, values }) => (
          <form className={cx(styles.form)} noValidate onSubmit={handleSubmit}>
            <Field
              name="title"
              render={({ input, meta }) => (
                <TextField
                  description="Add a short, descriptive headline"
                  id="title"
                  label="Feedback Title"
                  maxLength={75}
                  {...input}
                />
              )}
            />
            <Field
              name="category"
              render={({ input, meta }) => (
                <>
                  <SelectField
                    // TODO
                    defaultValue="ux"
                    description="Choose a category for your feedback"
                    id="category"
                    label="Category"
                    {...input}
                  >
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="ui">UI</SelectItem>
                    <SelectItem value="ux">UX</SelectItem>
                    <SelectItem value="enhancement">Enhancement</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                  </SelectField>
                  {role === 'admin' && (
                    <SelectField
                      // TODO
                      defaultValue="live"
                      description="Change feature state"
                      id="status"
                      label={isNew ? 'Status' : 'Update Status'}
                      name="status"
                    >
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In-Progress</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                    </SelectField>
                  )}
                </>
              )}
            />
            <Field
              name="description"
              render={({ input, meta }) => (
                <TextField
                  description="Include any specific comments on what should be improved, added, etc."
                  id="description"
                  label="Feedback Detail"
                  maxLength={300}
                  multiline
                  rows={5}
                  {...input}
                />
              )}
            />
            <div className={cx(styles.buttonWrapper)}>
              <Button className={cx(styles.add)} type="submit" variant="1">
                {isNew ? 'Add Feedback' : 'Save Changes'}
              </Button>
              <Button className={cx(styles.cancel)} onClick={cancel} variant="3">
                Cancel
              </Button>
              {!isNew && (
                <Button
                  className={cx(styles.delete)}
                  onClick={toggleDeleteDialog}
                  variant="4"
                >
                  Delete
                </Button>
              )}
            </div>
          </form>
        )}
      />
    </Paper>
  );
}
