import type { SuggestionsFilterDisplay } from '@t/ui';
import cx from 'clsx';
import { useQuerystring } from 'src/hooks';
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
  const { map, setSearchParams } = useQuerystring();

  const categories = map.category || [];

  const isSelected = (filter: SuggestionsFilterDisplay) => {
    const filterToLower = filter.toLowerCase();
    if (!categories.length && filterToLower === 'all') {
      return true;
    }
    return categories.includes(filterToLower);
  };

  const onClick = (filter: SuggestionsFilterDisplay) => () => {
    const filterToLower = filter.toLowerCase();
    if (filterToLower === 'all') {
      setSearchParams({});
    } else if (categories.includes(filterToLower)) {
      const newCategories = categories.filter((c) => c !== filterToLower);
      setSearchParams({ category: newCategories });
    } else {
      setSearchParams({ category: [...categories, filterToLower] });
    }
  };

  return (
    <Paper
      aria-label="filter requests"
      className={cx(styles.paper)}
      component="nav"
    >
      <ul className={cx(styles.filterList)}>
        {filterDisplay.map((filter) => (
          <li key={filter}>
            <FilterSuggestionsItem
              filter={filter}
              onClick={onClick(filter)}
              selected={isSelected(filter)}
            />
          </li>
        ))}
      </ul>
    </Paper>
  );
}
