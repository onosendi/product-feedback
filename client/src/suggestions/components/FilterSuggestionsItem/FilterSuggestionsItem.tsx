import type { SuggestionsFilterDisplay } from '@t/ui';
import { Button } from '../../../components';

interface FilterSuggestionsItemProps {
  filter: SuggestionsFilterDisplay;
  // TODO
  onClick: any;
  selected: boolean;
}

export default function FilterSuggestionsItem({
  filter,
  onClick,
  selected,
}: FilterSuggestionsItemProps) {
  // const filters = useSelector(selectFilters);
  // const router = useRouter();

  // const filterToLower = filter.toLowerCase();
  // const selected = (!filters.length && filterToLower === 'all')
  //   ? true
  //   : filters.includes(filterToLower);

  // const onClick = () => {
  //   let searchParams = new URLSearchParams(window.location.search);

  //   if (filterToLower === 'all') {
  //     searchParams.delete('category');
  //   } else if (selected) {
  //     const newSearchParams = [...searchParams].filter(([key, val]) => (
  //       key !== 'category' || val !== filterToLower));
  //     searchParams = new URLSearchParams(newSearchParams);
  //   } else {
  //     searchParams.append('category', filterToLower);
  //   }

  //   router.push(`${routes.index}?${searchParams.toString()}`);
  // };

  return (
    <Button onClick={onClick} selected={selected} variant="5">{filter}</Button>
  );
}