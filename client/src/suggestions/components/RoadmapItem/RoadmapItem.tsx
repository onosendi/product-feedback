import type { RoadmapResponse } from '@t/response';
import cx from 'clsx';
import SuggestionsChild from '../SuggestionsChild';
import styles from './RoadmapItem.module.scss';

interface RoadmapItemProps {
  description: string;
  heading: string;
  showColumn: boolean;
  suggestions: RoadmapResponse[];
}

export default function RoadmapItem({
  description,
  heading,
  showColumn,
  suggestions,
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
      {!suggestions
        ? (
          // TODO
          <p>Nothing to see here...</p>
        ) : <SuggestionsChild forRoadmap suggestions={suggestions} />}
    </div>
  );
}
