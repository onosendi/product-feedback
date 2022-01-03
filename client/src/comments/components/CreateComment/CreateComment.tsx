import type { APICreateComment } from '@t/api';
import cx from 'clsx';
import qs from 'qs';
import { Field, Form } from 'react-final-form';
import { Button, Paper, TextField } from '../../../components';
import { useCreateCommentMutation } from '../../api';
import styles from './CreateComment.module.scss';

interface CreateCommentProps {
  suggestionId: string;
}

export default function CreateComment({
  suggestionId,
}: CreateCommentProps) {
  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (values: APICreateComment) => {
    const querystring = qs.stringify({ suggestion_id: suggestionId });
    const obj = {
      ...values,
      querystring,
    };

    // TODO: toast
    await createComment(obj);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting }) => (
        <Paper
          className={cx(styles.form)}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <Field
            name="content"
            render={({ input }) => (
              <TextField
                id="add-comment"
                label="Add Comment"
                labelTextClassName={cx(styles.labelText)}
                labelWrapperClassName={cx(styles.labelWrapper)}
                maxLength={255}
                multiline
                placeholder="Type your comment here"
                {...input}
              />
            )}
          />
          <div className={cx(styles.buttonWrapper)}>
            <Button
              disabled={submitting}
              type="submit"
              variant="1"
            >
              Post Comment
            </Button>
          </div>
        </Paper>
      )}
    />
  );
}
