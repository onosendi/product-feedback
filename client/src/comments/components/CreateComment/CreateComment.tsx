import cx from 'clsx';
import { Field, Form } from 'react-final-form';
import { Button, Paper, TextField } from 'src/components';
import styles from './CreateComment.module.scss';

interface CreateCommentProps {
  suggestionId: string;
}

export default function CreateComment({
  suggestionId,
}: CreateCommentProps) {
  const onSubmit = (values: {
    content: string;
  }) => {
    console.log(values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, values }) => (
        <Paper
          className={cx(styles.form)}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <Field
            name="content"
            render={({ input, meta }) => (
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
