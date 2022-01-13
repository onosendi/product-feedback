import type { RoadmapResponse } from '@t/response';
import cx from 'clsx';
import { FeedbackList } from '..';
import styles from './RoadmapItem.module.scss';

interface RoadmapItemProps {
  description: string;
  feedback: RoadmapResponse[];
  heading: string;
  showColumn: boolean;
}

export default function RoadmapItem({
  description,
  heading,
  showColumn,
  feedback,
}: RoadmapItemProps) {
  return (
    <div
      className={cx(
        styles.column,
        showColumn && styles.showColumn,
      )}
    >
      <h2 className={cx('type-jost-bold', styles.columnHeader)}>
        {heading}
      </h2>
      <p className={cx('type-jost', styles.columnDescription)}>{description}</p>
      {!feedback
        ? (
          <p className={cx('type-jost', styles.nothingToSee)}>
            Nothing to see here...
          </p>
        ) : <FeedbackList forRoadmap feedback={feedback} />}
    </div>
  );
}
