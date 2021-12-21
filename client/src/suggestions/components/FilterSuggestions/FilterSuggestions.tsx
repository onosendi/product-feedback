import type { SuggestionsFilterDisplay } from '@t/ui';
import cx from 'clsx';
import { FilterSuggestionsItem } from '..';
import { Paper } from '../../../components';
import styles from './FilterSuggestions.module.scss';

const filterDisplay: SuggestionsFilterDisplay[] = [
  'All',
  'UI',
  'UX',
  'Enhancement',
  'Bug',
  'Feature',
];

export default function FilterSuggestions() {
  return (
    <Paper aria-label="filter requests" className={cx(styles.paper)} component="nav">
      <ul className={cx(styles.filterList)}>
        {filterDisplay.map((filter) => (
          <li key={filter}>
            <FilterSuggestionsItem filter={filter} />
          </li>
        ))}
      </ul>
    </Paper>
  );
}
