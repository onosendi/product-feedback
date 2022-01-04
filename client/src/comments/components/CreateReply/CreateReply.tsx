import type { CommentResponse } from '@t/response';
import cx from 'clsx';
import type { FormApi } from 'final-form';
import { Field, Form } from 'react-final-form';
import { Button, TextField } from '../../../components';
import { getHasError, getHelperText, hasValidationErrors } from '../../../lib/utils';
import { useCreateCommentMutation } from '../../api';
import styles from './CreateReply.module.scss';

interface CreateReplyProps {
  data: CommentResponse;
  parentId: string;
}

export default function CreateReply({
  data,
  parentId,
}: CreateReplyProps) {
  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (values: Record<string, any>, form: FormApi) => {
    await createComment({
      body: { content: values.content },
      meta: {
        parentId,
        suggestionId: data.suggestionId,
      },
    });
  };

  // const onFocus = (event: FocusEvent<HTMLInputElement>) => {
  //   const { currentTarget } = event;
  //   currentTarget.selectionStart = currentTarget.value.length;
  //   currentTarget.selectionEnd = currentTarget.selectionStart;
  // };

  return (
    <Form
      onSubmit={(values, form) => { onSubmit(values, form); }}
      render={({ form, handleSubmit, submitting }) => (
        <form
          className={cx(
            styles.commentForm,
            data.suggestionCommentParentId
              ? styles.commentFormReply
              : styles.commentFormComment,

          )}
          noValidate
          onSubmit={handleSubmit}
        >
          <Field
            name="content"
            // TODO: Validate this
            render={({ input, meta }) => (
              <TextField
                autoFocus
                defaultValue={`@${data.username} `}
                hasError={getHasError(meta)}
                helperText={getHelperText(meta)}
                id={`comment-${data.id}`}
                label="Add reply"
                maxLength={255}
                multiline
                showLabel={false}
                {...input}
              />
            )}
          />
          <Button
            className={cx(styles.replyButton)}
            disabled={submitting || hasValidationErrors(form)}
            type="submit"
            variant="1"
          >
            Post Reply
          </Button>
        </form>
      )}
    />
  );
}