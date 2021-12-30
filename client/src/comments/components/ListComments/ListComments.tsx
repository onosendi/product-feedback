import cx from 'clsx';
import { useGetCommentsQuery } from 'src/comments/api';
import { Paper } from 'src/components';
import CommentItem from '../CommentItem';
import styles from './ListComments.module.scss';

interface ListCommentsProps {
  suggestionId: string;
}

export default function ListComments({
  suggestionId,
}: ListCommentsProps) {
  const {
    data: comments = [],
    isFetching,
  } = useGetCommentsQuery(suggestionId);

  if (isFetching) {
    // TODO
    return <p>Loading</p>;
  }

  if (!Object.entries(comments).length && !isFetching) {
    return null;
  }

  return (
    <Paper className={cx(styles.commentPaper)}>
      <p className={cx('type-jost-bold', styles.commentCount)}>
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
