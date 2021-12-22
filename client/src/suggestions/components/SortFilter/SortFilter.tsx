import cx from 'clsx';
import type { ReactNode } from 'react';
import { SelectCaret, SelectList } from '../../../components';
import {
  useAnimatedToggle,
  useKeyDown,
  useOutsideClick,
  useSelectValue,
} from '../../../hooks';
import styles from './SortFilter.module.scss';

interface SortFilterProps {
  children: ReactNode;
}

export default function SortFilter({
  children,
}: SortFilterProps) {
  // const router = useRouter();

  const {
    close,
    mounted,
    onAnimationEnd,
    startAnimatingOut: out,
    toggle,
    toggleRef,
  } = useAnimatedToggle();

  const [selected, setSelected] = useSelectValue(null, children);

  const onSelect = (value: any) => {
    setSelected(value);
    close();

    // const searchParams = new URLSearchParams(window.location.search);
    // const [sort, direction] = value.value.split('-');
    // searchParams.set('sort', sort);
    // searchParams.set('direction', direction);

    // router.push(`${routes.index}?${searchParams.toString()}`);
  };

  useOutsideClick(close, toggleRef, mounted);
  useKeyDown({ Escape: close }, mounted);

  return (
    <div className={cx(styles.wrapper)}>
      <button className={cx('type-4', styles.button)} onClick={toggle} type="button">
        <span>Sort by</span>
        {selected.children}
        <SelectCaret className={cx(styles.caret)} open={mounted && !out} />
      </button>
      {mounted && (
        <SelectList
          className={cx(
            'select-list',
            out ? 'fade-close' : 'fade-open',
            styles.list,
          )}
          focusTrapOptions={{
            allowOutsideClick: true,
            initialFocus: false,
          }}
          onAnimationEnd={onAnimationEnd}
          onSelect={onSelect}
          selectedValue={selected.value}
        >
          {children}
        </SelectList>
      )}
    </div>
  );
}
