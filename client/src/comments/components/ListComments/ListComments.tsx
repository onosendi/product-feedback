import cx from 'clsx';
import { useSelector } from 'react-redux';
import { CommentItem } from '..';
import { DelayChildren, Paper } from '../../../components';
import type { RootState } from '../../../lib/store';
import { useGetCommentsQuery } from '../../api';
import { selectComments } from '../../slice';
import styles from './ListComments.module.scss';

interface ListCommentsProps {
  suggestionId: string;
}

export default function ListComments({
  suggestionId,
}: ListCommentsProps) {
  const { isFetching } = useGetCommentsQuery(suggestionId);
  const comments = useSelector((state: RootState) => (
    selectComments(state, suggestionId)));

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
            {comment.replies?.length && (
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
