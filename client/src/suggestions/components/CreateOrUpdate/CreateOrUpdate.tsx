import cx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/auth/hooks';
import {
  Button,
  Dialog,
  Paper,
  Select,
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
      <form
        className={cx(styles.form)}
        noValidate
      >
        <TextField
          description="Add a short, descriptive headline"
          id="title"
          label="Feedback Title"
          maxLength={75}
          name="title"
        />
        <Select
          description="Choose a category for your feedback"
          id="category"
          label="Category"
          name="category"
        >
          <SelectItem value="feature">Feature</SelectItem>
          <SelectItem value="ui">UI</SelectItem>
          <SelectItem value="ux">UX</SelectItem>
          <SelectItem value="enhancement">Enhancement</SelectItem>
          <SelectItem value="bug">Bug</SelectItem>
        </Select>
        {role === 'admin' && (
          <Select
            description="Change feature state"
            id="status"
            label={isNew ? 'Status' : 'Update Status'}
            name="status"
          >
            <SelectItem value="suggestion">Suggestion</SelectItem>
            <SelectItem value="planned">Planned</SelectItem>
            <SelectItem value="in-progress">In-Progress</SelectItem>
            <SelectItem value="live">Live</SelectItem>
          </Select>
        )}
        <TextField
          description="Include any specific comments on what should be improved, added, etc."
          id="description"
          label="Feedback Detail"
          maxLength={300}
          multiline
          name="description"
          rows={5}
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
    </Paper>
  );
}
