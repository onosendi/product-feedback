import type { DBId } from '@t/database';
import type { CommentResponse } from '@t/response';
import cx from 'clsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateReply } from '..';
import { useAuth } from '../../../auth/hooks';
import routes from '../../../project/routes';
import { getFullName } from '../../../project/utils';
import { Picture } from '../../../users/components';
import styles from './CommentItem.module.scss';

type CommentItemProps = {
  data: CommentResponse,
  parentId: DBId,
};

export default function CommentItem({
  data,
  parentId,
}: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();

  const fullName = getFullName(data.firstName, data.lastName);
  const hasName = !!fullName;
  const tokenizedContent = data.content.split(/(@\w+)/g);
  const stylizedContent = tokenizedContent.map((token, index) => (
    // In this case, it's okay to use `index` as a key.
    // eslint-disable-next-line react/no-array-index-key
    index % 2 === 0 ? token : <span key={index}>{token}</span>));

  const toggleReply = () => {
    if (!isAuthenticated) {
      navigate(routes.auth.login, {
        state: { path: pathname },
      });
    }
    setShowReply(!showReply);
  };

  return (
    <article>
      <footer className={cx(styles.footer)}>
        <Picture
          alt={hasName ? fullName : data.username}
          className={cx(styles.picture)}
          src={data.picture}
        />
        <div className={cx(styles.namesWrapper)}>
          {hasName && <p className={cx('type-jost-bold', styles.name)}>{fullName}</p>}
          <p className={cx('type-jost', styles.username)}>{data.username}</p>
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
        <CreateReply
          data={data}
          parentId={parentId}
          setShowReply={setShowReply}
        />
      )}
    </article>
  );
}
