import type { FeedbackResponse } from '@t/response';
import cx from 'clsx';
import { useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks';
import {
  Button,
  Dialog,
  Paper,
  SelectField,
  SelectItem,
  TextField,
} from '../../../components';
import routes from '../../../lib/routes';
import { getHasError, getHelperText, hasValidationErrors } from '../../../lib/utils';
import { composeValidators, isFilled, isLength } from '../../../lib/validators';
import {
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  useEditFeedbackMutation,
} from '../../api';
import styles from './CreateOrUpdate.module.scss';

type CreateOrUpdateProps = {
  feedback?: FeedbackResponse,
};

export default function CreateOrUpdate({
  feedback,
}: CreateOrUpdateProps) {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [createFeedback] = useCreateFeedbackMutation();
  const [editFeedback] = useEditFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const { role } = useAuth();
  const isNew = feedback === undefined;

  const cancelHref = feedback
    ? routes.feedback.detail(feedback.slug)
    : routes.feedback.list;

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
      await editFeedback({
        body,
        meta: { feedbackId: feedback.id },
      });
      navigate(routes.feedback.detail(feedback.slug));
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
        render={({
          form,
          handleSubmit,
          submitting,
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
              validate={composeValidators(
                [isFilled],
                [isLength, { min: 5 }],
              )}
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
              validate={isFilled}
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
                disabled={submitting || hasValidationErrors(form)}
                type="submit"
                variant="1"
              >
                {isNew ? 'Add Feedback' : 'Save Changes'}
              </Button>
              <Button
                className={cx(styles.cancel)}
                href={cancelHref}
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
