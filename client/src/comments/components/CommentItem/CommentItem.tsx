import type { DBId } from '@t/database';
import type { CommentResponse } from '@t/response';
import cx from 'clsx';
import { useState } from 'react';
import { CreateReply } from '..';
import { useNeedsAuthentication } from '../../../auth/hooks';
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
  const needsAuthentication = useNeedsAuthentication();

  const fullName = getFullName(data.firstName, data.lastName);
  const hasName = !!fullName;
  const tokenizedContent = data.content.split(/(@\w+)/g);
  const stylizedContent = tokenizedContent.map((token, index) => (
    // In this case, it's okay to use `index` as a key.
    // eslint-disable-next-line react/no-array-index-key
    index % 2 === 0 ? token : <span key={index}>{token}</span>));

  const toggleReply = () => {
    needsAuthentication(() => {
      setShowReply(!showReply);
    });
  };

  return (
    <article>
      <footer className={cx(styles.footer)}>
        <Picture
          alt={hasName ? fullName : data.username}
          className={cx(styles.picture)}
          emailHash={data.emailHash}
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
