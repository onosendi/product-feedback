import type { CommentResponse } from '@t/response';
import cx from 'clsx';
import type { FocusEvent } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, TextField } from '../../../components';
import { getHasError, getHelperText, hasValidationErrors } from '../../../lib/utils';
import { composeValidators, isFilled } from '../../../lib/validators';
import { useCreateCommentMutation } from '../../api';
import styles from './CreateReply.module.scss';

interface CreateReplyProps {
  data: CommentResponse;
  parentId: string;
  setShowReply: (state: boolean) => void;
}

export default function CreateReply({
  data,
  parentId,
  setShowReply,
}: CreateReplyProps) {
  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (values: Record<string, any>) => {
    await createComment({
      body: { content: values.content },
      meta: {
        parentId,
        suggestionId: data.suggestionId,
      },
    });
    setShowReply(false);
  };

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    currentTarget.selectionStart = currentTarget.value.length;
    currentTarget.selectionEnd = currentTarget.selectionStart;
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({
        form,
        handleSubmit,
        pristine,
        submitting,
      }) => (
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
            initialValue={`@${data.username} `}
            validate={composeValidators(
              [isFilled],
            )}
            // TODO: Validate this
            render={({ input, meta }) => (
              <TextField
                {...input}
                autoFocus
                defaultValue={`@${data.username} `}
                hasError={getHasError(meta)}
                helperText={getHelperText(meta)}
                id={`comment-${data.id}`}
                label="Add reply"
                onFocus={(event) => {
                  input.onFocus(event);
                  onFocus(event);
                }}
                maxLength={255}
                multiline
                showLabel={false}
              />
            )}
          />
          <Button
            className={cx(styles.replyButton)}
            disabled={pristine || submitting || hasValidationErrors(form)}
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
