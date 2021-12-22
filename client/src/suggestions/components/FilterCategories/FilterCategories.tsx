import type { DBSuggestionCategoryDisplay } from '@t/database';
import cx from 'clsx';
import { useQuerystring } from 'src/hooks';
import { Button, Paper } from '../../../components';
import styles from './FilterCategories.module.scss';

type FilterSuggestionsCategories = DBSuggestionCategoryDisplay | 'All';

const filterDisplay: FilterSuggestionsCategories[] = [
  'All',
  'UI',
  'UX',
  'Enhancement',
  'Bug',
  'Feature',
];

export default function FilterCategories() {
  const { map, setSearchParams } = useQuerystring();

  const categories = map.category || [];

  const isSelected = (filter: FilterSuggestionsCategories) => {
    const filterToLower = filter.toLowerCase();
    if (!categories.length && filterToLower === 'all') {
      return true;
    }
    return categories.includes(filterToLower);
  };

  const onClick = (filter: FilterSuggestionsCategories) => () => {
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
            <Button
              onClick={onClick(filter)}
              selected={isSelected(filter)}
              variant="5"
            >
              {filter}
            </Button>
          </li>
        ))}
      </ul>
    </Paper>
  );
}
