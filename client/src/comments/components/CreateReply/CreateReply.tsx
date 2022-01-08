import type { DBId } from '@t/database';
import type { CommentResponse } from '@t/response';
import cx from 'clsx';
import type { FocusEvent } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, TextField } from '../../../project/components';
import { getHasError, getHelperText, hasValidationErrors } from '../../../project/utils';
import { composeValidators, isFilled, isNotEqualToInitial } from '../../../project/validators';
import { useCreateCommentMutation } from '../../api';
import styles from './CreateReply.module.scss';

type CreateReplyProps = {
  data: CommentResponse,
  parentId: DBId,
  setShowReply: (state: boolean) => void,
};

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
        feedbackId: data.feedbackId,
      },
    });
    setShowReply(false);
  };

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    currentTarget.selectionStart = currentTarget.value.length;
    currentTarget.selectionEnd = currentTarget.selectionStart;
  };

  const initialContentValue = `@${data.username} `;

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
            data.feedbackCommentParentId
              ? styles.commentFormReply
              : styles.commentFormComment,

          )}
          noValidate
          onSubmit={handleSubmit}
        >
          <Field
            name="content"
            initialValue={initialContentValue}
            validate={composeValidators(
              [isFilled],
              [isNotEqualToInitial('content', form)],
            )}
            render={({ input, meta }) => (
              <TextField
                {...input}
                autoFocus
                defaultValue={initialContentValue}
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
