import type { DBComment } from '@t/database';
import cx from 'clsx';
import type { FocusEvent } from 'react';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/auth/hooks';
import { Button, TextField } from 'src/components';
import { getFullName } from 'src/lib/utils';
import { Picture } from 'src/users/components';
import routes from '../../../lib/routes';
import styles from './CommentItem.module.scss';

interface CommentItemProps {
  data: DBComment;
  parentId: string;
}

export default function CommentItem({
  data,
  parentId,
}: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    content,
    firstName,
    lastName,
    id,
    picture,
    suggestionCommentParentId,
    suggestionId,
    username,
  } = data;

  const fullName = getFullName(firstName, lastName);
  const hasName = !!fullName;
  const tokenizedContent = content.split(/(@\w+)/g);
  const stylizedContent = tokenizedContent.map((token, index) => (
    // In this case, it's okay to use `index` as a key.
    // eslint-disable-next-line react/no-array-index-key
    index % 2 === 0 ? token : <span key={index}>{token}</span>));

  const toggleReply = () => {
    if (!isAuthenticated) {
      navigate(routes.auth.login);
      return;
    }
    setShowReply(!showReply);
  };

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    currentTarget.selectionStart = currentTarget.value.length;
    currentTarget.selectionEnd = currentTarget.selectionStart;
  };

  const onSubmit = () => {
    console.log(suggestionId);
  };

  return (
    <article>
      <footer className={cx(styles.footer)}>
        <Picture
          alt={hasName ? fullName : username}
          className={cx(styles.picture)}
          src={picture}
        />
        <div className={cx(styles.namesWrapper)}>
          {hasName && <p className={cx('type-jost-bold', styles.name)}>{fullName}</p>}
          <p className={cx('type-jost', styles.username)}>{username}</p>
        </div>
        <button
          className={cx('type-body3', styles.reply)}
          onClick={toggleReply}
          type="button"
        >
          Reply
        </button>
      </footer>
      <p className={cx('type-body2', styles.content)}>{stylizedContent}</p>
      {showReply && (
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, values }) => (
            <form
              className={cx(
                styles.commentForm,
                suggestionCommentParentId
                  ? styles.commentFormReply
                  : styles.commentFormComment,

              )}
              noValidate
              onSubmit={onSubmit}
            >
              <Field
                name="content"
                render={({ input, meta }) => (
                  <TextField
                    autoFocus
                    defaultValue={`@${username} `}
                    id={`comment-${id}`}
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
                type="submit"
                variant="1"
              >
                Post Reply
              </Button>
            </form>
          )}
        />
      )}
    </article>
  );
}
