import cx from 'clsx';
import type { FormApi } from 'final-form';
import { useRef } from 'react';
import { Field, Form } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import { object as yupObject, string as yupString } from 'yup';
import { useAuth } from '../../../auth/hooks';
import { Button, Paper, TextField } from '../../../project/components';
import routes from '../../../project/routes';
import { getHasError, getHelperText } from '../../../project/utils';
import { REQUIRED, validateFormValues } from '../../../project/validators';
import { useCreateCommentMutation } from '../../api';
import styles from './CreateComment.module.scss';

const validationSchema = yupObject({
  content: yupString().required(REQUIRED).trim(),
});

interface CreateCommentProps {
  feedbackId: string;
}

export default function CreateComment({
  feedbackId,
}: CreateCommentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuth();
  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (values: Record<string, any>, form: FormApi) => {
    // TODO: toast
    await createComment({
      body: { content: values.content },
      meta: { feedbackId },
    });

    if (formRef.current) {
      formRef.current.content.value = '';
    }

    form.resetFieldState('content');
    form.change('content', '');
  };

  if (!isAuthenticated) {
    return (
      <Button
        className={cx(styles.loginToComment)}
        fullWidth
        href={routes.auth.login}
        navigateOptions={{
          state: { path: pathname + search },
        }}
        variant="2"
      >
        Login to comment
      </Button>
    );
  }

  return (
    <Form
      onSubmit={(values, form) => { onSubmit(values, form); }}
      validate={validateFormValues(validationSchema)}
      render={({
        handleSubmit,
        pristine,
        submitting,
        valid,
      }) => (
        <Paper
          className={cx(styles.form)}
          component="form"
          noValidate
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Field
            name="content"
            render={({ input, meta }) => (
              <TextField
                hasError={getHasError(meta)}
                helperText={getHelperText(meta)}
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
              disabled={pristine || submitting || !valid}
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
