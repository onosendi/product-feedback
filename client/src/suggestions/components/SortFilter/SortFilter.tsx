import cx from 'clsx';
import type { ReactNode } from 'react';
import { SelectCaret, SelectList } from '../../../components';
import {
  useAnimatedToggle,
  useKeyDown,
  useOutsideClick,
  useQuerystring,
  useSelectValue,
} from '../../../hooks';
import styles from './SortFilter.module.scss';

interface SortFilterProps {
  children: ReactNode;
}

export default function SortFilter({
  children,
}: SortFilterProps) {
  const { map, setSearchParams } = useQuerystring();

  const sorting = map.sort?.join('');
  const sort = ['votes', 'comment_count'].includes(sorting) ? sorting : 'votes';
  const order = map.order?.join('') === 'asc' ? 'asc' : 'desc';
  const sortOrder = `${sort}-${order}`;

  const [display, setDisplay] = useSelectValue(children, sortOrder);

  const {
    close,
    mounted,
    onAnimationEnd,
    startAnimatingOut,
    toggle,
    toggleRef,
  } = useAnimatedToggle();

  const onSelect = (obj: { value: string; children: string; }) => {
    close();
    setDisplay(obj.children);

    const [selectSort, selectOrder] = obj.value.split('-');
    setSearchParams({
      ...map,
      sort: selectSort,
      order: selectOrder,
    });
  };

  useOutsideClick(close, toggleRef, mounted);
  useKeyDown({ Escape: close }, mounted);

  return (
    <div className={cx(styles.wrapper)}>
      <button className={cx('type-4', styles.button)} onClick={toggle} type="button">
        <span>Sort by</span>
        {display}
        <SelectCaret className={cx(styles.caret)} open={mounted && !startAnimatingOut} />
      </button>
      {mounted && (
        <SelectList
          className={cx(
            'select-list',
            startAnimatingOut ? 'fade-close' : 'fade-open',
            styles.list,
          )}
          focusTrapOptions={{
            allowOutsideClick: true,
            initialFocus: false,
          }}
          onAnimationEnd={onAnimationEnd}
          onSelect={onSelect}
          selectedValue={sortOrder}
        >
          {children}
        </SelectList>
      )}
    </div>
  );
}
