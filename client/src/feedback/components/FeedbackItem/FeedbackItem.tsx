import type { FeedbackResponse } from '@t/response';
import cx from 'clsx';
import { Link } from 'react-router-dom';
import { Paper } from '../../../project/components';
import routes from '../../../project/routes';
import { capitalize } from '../../../project/utils';
import { Vote } from '../../../votes/components';
import styles from './FeedbackItem.module.scss';

interface FeedbackItempProps {
  data: FeedbackResponse;
  forRoadmap?: boolean;
  link?: boolean;
}

export default function FeedbackItem({
  data,
  forRoadmap = false,
  link = true,
}: FeedbackItempProps) {
  const responsive = !forRoadmap;

  return (
    <>
      <Paper
        className={cx(
          styles.link,
          responsive && styles.responsive,
          forRoadmap && styles.status,
          forRoadmap && styles[`status${data.status}`],
        )}
        component={link ? Link : 'div'}
        to={routes.feedback.detail(data.slug)}
      >
        <article>
          <h2 className={cx('type-3', styles.heading, responsive && styles.responsive)}>
            {data.title}
          </h2>
          <p className={cx('type-body1', styles.description)}>{data.description}</p>
          {forRoadmap && (
            <p
              className={cx(
                'type-jost',
                styles.statusText,
                styles.forRoadmapStatus,
                styles[data.status],
              )}
            >
              {capitalize(data.status)}
            </p>
          )}
          <span className={cx('type-body3', styles.category)}>{data.category}</span>
          <span
            className={cx(
              'type-jost-bold',
              styles.comments,
              responsive && styles.responsive,
              data.commentCount === 0 && styles.noComments,
            )}
          >
            <span className={cx(styles.commentsIcon, responsive && styles.responsive)} />
            {data.commentCount}
          </span>
        </article>
      </Paper>
      <Vote
        className={cx(styles.vote, responsive && styles.responsive)}
        id={data.id}
        responsive={responsive}
      />
    </>
  );
}
