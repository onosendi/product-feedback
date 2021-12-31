import type { APICreateOrUpdateSuggestion } from '@t/api';
import cx from 'clsx';
import { useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/auth/hooks';
import { getHasError, getHelperText, hasValidationErrors } from 'src/lib/utils';
import { useCreateSuggestionMutation } from 'src/suggestions/api';
import {
  Button,
  Dialog,
  Paper,
  SelectField,
  SelectItem,
  TextField,
} from '../../../components';
import { composeValidators, isFilled, isLength } from '../../../lib/validators';
import styles from './CreateOrUpdate.module.scss';

export default function CreateOrUpdate() {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [createSuggestion] = useCreateSuggestionMutation();
  const { role } = useAuth();
  const isNew = true;

  const cancel = () => {
    // TODO
    navigate(-1);
  };

  const onSubmit = async (values: APICreateOrUpdateSuggestion) => {
    const body = {
      ...values,
      category: formRef.current?.category?.value,
      status: formRef.current?.status?.value,
    };

    try {
      // TODO: handle errors
      await createSuggestion(body).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // TODO
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
        render={({ handleSubmit, submitting, form }) => (
          <form
            className={cx(styles.form)}
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <Field
              name="title"
              validate={composeValidators(
                [isFilled],
                [isLength, { min: 5 }],
              )}
              render={({ input, meta }) => (
                <TextField
                  description="Add a short, descriptive headline"
                  hasError={getHasError(meta)}
                  helperText={getHelperText(meta)}
                  id="title"
                  label="Feedback Title"
                  maxLength={75}
                  {...input}
                />
              )}
            />
            <SelectField
              // TODO
              defaultValue="ux"
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
            <Field
              name="description"
              validate={isFilled}
              render={({ input, meta }) => (
                <TextField
                  description="Include any specific comments on what should be improved, added, etc."
                  hasError={getHasError(meta)}
                  helperText={getHelperText(meta)}
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
              <Button
                className={cx(styles.add)}
                disabled={submitting || hasValidationErrors(form)}
                type="submit"
                variant="1"
              >
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
