import type { DBId } from '@t/database';
import type { CommentResponse } from '@t/response';
import cx from 'clsx';
import type { FocusEvent } from 'react';
import { Field, Form } from 'react-final-form';
import { object as yupObject, string as yupString } from 'yup';
import { Button, TextField } from '../../../project/components';
import { getHasError, getHelperText } from '../../../project/utils';
import { REQUIRED, validateFormValues } from '../../../project/validators';
import { useCreateCommentMutation } from '../../api';
import styles from './CreateReply.module.scss';

const validationSchema = yupObject({
  content: yupString().required(REQUIRED).trim(),
});

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
      body: { content: values.content.trim() },
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
      validate={validateFormValues(validationSchema)}
      render={({
        handleSubmit,
        pristine,
        submitting,
        valid,
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
            disabled={pristine || submitting || !valid}
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
