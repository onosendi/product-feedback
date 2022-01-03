import type { APICreateComment } from '@t/api';
import cx from 'clsx';
import type { FormApi } from 'final-form';
import qs from 'qs';
import { useRef } from 'react';
import { Field, Form } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks';
import { Button, Paper, TextField } from '../../../components';
import routes from '../../../lib/routes';
import { getHasError, getHelperText, hasValidationErrors } from '../../../lib/utils';
import { isFilled } from '../../../lib/validators';
import { useCreateCommentMutation } from '../../api';
import styles from './CreateComment.module.scss';

interface CreateCommentProps {
  suggestionId: string;
}

export default function CreateComment({
  suggestionId,
}: CreateCommentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuth();
  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (values: Record<string, any>, form: FormApi) => {
    const querystring = qs.stringify({ suggestion_id: suggestionId });
    const obj = {
      content: values.content,
      querystring,
    };

    // TODO: toast
    await createComment(obj);

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
      render={({ form, handleSubmit, submitting }) => (
        <Paper
          className={cx(styles.form)}
          component="form"
          noValidate
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Field
            name="content"
            validate={isFilled}
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
              disabled={submitting || hasValidationErrors(form)}
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
