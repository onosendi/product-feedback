import cx from 'clsx';
import { SuggestionsItem } from '..';
import styles from './SuggestionsChild.module.scss';

interface SuggestionsChildProps {
  forRoadmap?: boolean;
  // TODO
  suggestions: any[];
}

export default function SuggestionsChild({
  forRoadmap = false,
  suggestions,
}: SuggestionsChildProps) {
  return (
    <ul className={cx(styles.list)}>
      {suggestions.map((item) => (
        <li key={item.id}>
          <SuggestionsItem data={item} forRoadmap={forRoadmap} />
        </li>
      ))}
    </ul>
  );
}
