import cx from 'clsx';
import FocusTrap from 'focus-trap-react';
import type { RefObject } from 'react';
import { useRef } from 'react';
import { FilterCategories, RoadmapInfo } from '..';
import { useKeyDown, useNoScroll, useOutsideClick } from '../../../project/hooks';
import styles from './Drawer.module.scss';

interface DrawerProps {
  closeDrawer: VoidFunction;
  onAnimationEnd: VoidFunction;
  startAnimatingOut: boolean;
  toggleRef: RefObject<HTMLElement>;
}

export default function Drawer({
  closeDrawer,
  onAnimationEnd,
  startAnimatingOut,
  toggleRef,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useKeyDown({ Escape: closeDrawer });
  useOutsideClick(closeDrawer, [drawerRef, toggleRef]);
  useNoScroll();

  return (
    <FocusTrap
      focusTrapOptions={{
        allowOutsideClick: true,
        initialFocus: false,
      }}
    >
      <div
        className={cx(
          styles.drawer,
          startAnimatingOut ? styles.close : styles.open,
        )}
        id="drawer"
        onAnimationEnd={onAnimationEnd}
        ref={drawerRef}
      >
        <FilterCategories />
        <RoadmapInfo />
      </div>
    </FocusTrap>
  );
}
