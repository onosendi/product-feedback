import type { FeedbackResponse } from '@t/response';
import cx from 'clsx';
import { useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { object as yupObject, string as yupString } from 'yup';
import { useAuth } from '../../../auth/hooks';
import {
  Button,
  Dialog,
  Paper,
  SelectField,
  SelectItem,
  TextField,
} from '../../../project/components';
import { usePreviousPage } from '../../../project/hooks';
import routes from '../../../project/routes';
import { getHasError, getHelperText } from '../../../project/utils';
import { REQUIRED, validateFormValues } from '../../../project/validators';
import {
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  useEditFeedbackMutation,
} from '../../api';
import styles from './CreateOrUpdate.module.scss';

const validationSchema = yupObject({
  title: yupString()
    .required(REQUIRED)
    .min(5, 'Must be at least 5 characters')
    .max(75, 'Can\'t be more than 75 characters'),
  description: yupString()
    .required(REQUIRED)
    .max(300, 'Can\'t be more than 300 characters'),
});

type CreateOrUpdateProps = {
  feedback?: FeedbackResponse,
};

export default function CreateOrUpdate({
  feedback,
}: CreateOrUpdateProps) {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const previousPage = usePreviousPage();

  const [createFeedback] = useCreateFeedbackMutation();
  const [editFeedback] = useEditFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const { role } = useAuth();
  const isNew = feedback === undefined;

  const onSubmit = async (values: Record<string, any>) => {
    const body = {
      category: formRef.current?.category?.value,
      description: values.description,
      status: formRef.current?.status?.value,
      title: values.title,
    };

    if (isNew) {
      // TODO: toast
      await createFeedback(body);
      navigate(routes.feedback.list);
    } else {
      // TODO: toast
      await editFeedback({
        body,
        meta: { feedbackId: feedback.id },
      });
      navigate(previousPage);
    }
  };

  const handleDeleteSuggestsion = async () => {
    if (feedback?.id) {
      await deleteFeedback(feedback.id);
      navigate(routes.feedback.list);
      // TODO: toast
    }
  };

  const toggleDeleteDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <Paper className={cx(styles.paper)} component="main">
      {showDialog && (
        <Dialog
          onClose={toggleDeleteDialog}
          onProceed={handleDeleteSuggestsion}
        >
          Are you sure you want to delete this feedback?
        </Dialog>
      )}
      <span className={cx(styles.icon, isNew ? styles.iconNew : styles.iconEdit)} />
      <h1 className={cx('type-1', styles.heading)}>
        {isNew
          ? 'Create New Feedback'
          : `Editing ${feedback.title}`}
      </h1>
      <Form
        onSubmit={onSubmit}
        validate={validateFormValues(validationSchema)}
        render={({
          handleSubmit,
          pristine,
          submitting,
          valid,
        }) => (
          <form
            className={cx(styles.form)}
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <Field
              name="title"
              initialValue={feedback?.title}
              render={({ input, meta }) => (
                <TextField
                  defaultValue={feedback?.title}
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
              defaultValue={feedback?.category?.toLowerCase()}
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
                defaultValue={feedback?.status?.toLowerCase()}
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
              initialValue={feedback?.description}
              render={({ input, meta }) => (
                <TextField
                  defaultValue={feedback?.description}
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
                disabled={submitting || pristine || !valid}
                type="submit"
                variant="1"
              >
                {isNew ? 'Add Feedback' : 'Save Changes'}
              </Button>
              <Button
                className={cx(styles.cancel)}
                href={previousPage}
                variant="3"
              >
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
