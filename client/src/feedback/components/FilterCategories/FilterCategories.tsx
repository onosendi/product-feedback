import type { DBCategoryDisplay } from '@t/database';
import cx from 'clsx';
import { Button, Paper } from '../../../components';
import { useQuerystring } from '../../../hooks';
import styles from './FilterCategories.module.scss';

type FilterFeedbackCategory = DBCategoryDisplay | 'All';

const filterDisplay: FilterFeedbackCategory[] = [
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

  const isSelected = (filter: FilterFeedbackCategory) => {
    const filterToLower = filter.toLowerCase();
    if (!categories.length && filterToLower === 'all') {
      return true;
    }
    return categories.includes(filterToLower);
  };

  const onClick = (filter: FilterFeedbackCategory) => () => {
    const filterToLower = filter.toLowerCase();
    if (filterToLower === 'all') {
      const { category, ...rest } = map;
      setSearchParams(rest);
    } else if (categories.includes(filterToLower)) {
      const newCategories = categories.filter((c) => c !== filterToLower);
      setSearchParams({ ...map, category: newCategories });
    } else {
      setSearchParams({ ...map, category: [...categories, filterToLower] });
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
