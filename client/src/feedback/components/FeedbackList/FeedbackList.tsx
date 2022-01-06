import type { FeedbackResponse } from '@t/response';
import cx from 'clsx';
import { FeedbackItem } from '..';
import styles from './FeedbackList.module.scss';

interface FeedbackListProps {
  forRoadmap?: boolean;
  feedback: FeedbackResponse[];
}

export default function FeedbackList({
  forRoadmap = false,
  feedback,
}: FeedbackListProps) {
  return (
    <ul className={cx(styles.list)}>
      {feedback.map((item) => (
        <li key={item.id}>
          <FeedbackItem data={item} forRoadmap={forRoadmap} />
        </li>
      ))}
    </ul>
  );
}
