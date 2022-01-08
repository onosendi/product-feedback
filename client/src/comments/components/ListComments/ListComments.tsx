import type { DBId } from '@t/database';
import cx from 'clsx';
import { useSelector } from 'react-redux';
import { CommentItem } from '..';
import { DelayChildren, Paper } from '../../../project/components';
import type { RootState } from '../../../project/store';
import { useGetCommentsQuery } from '../../api';
import { selectComments } from '../../slice';
import styles from './ListComments.module.scss';

interface ListCommentsProps {
  feedbackId: DBId;
}

export default function ListComments({
  feedbackId,
}: ListCommentsProps) {
  const { isFetching } = useGetCommentsQuery(feedbackId);
  const comments = useSelector((state: RootState) => (
    selectComments(state, feedbackId)));

  if (isFetching) {
    // TODO
    return (
      <DelayChildren>
        <p>Loading...</p>
      </DelayChildren>
    );
  }

  if (!Object.entries(comments).length) {
    return null;
  }

  return (
    <Paper className={cx(styles.commentPaper)}>
      <p className={cx('type-jost-bold', styles.commentCount)}>
        {/* TODO: comment/reply count */}
        {`${comments.length} Comments`}
      </p>
      <ul className={cx(styles.commentList)}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem data={comment} parentId={comment.id} />
            {comment.replies && (
              <ul>
                {comment.replies.map((reply) => (
                  <li key={reply.id}>
                    <CommentItem data={reply} parentId={comment.id} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Paper>
  );
}
