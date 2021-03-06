import cx from 'clsx';
import { createPortal } from 'react-dom';
import { Drawer } from '..';
import { Backdrop } from '../../../project/components';
import { useAnimatedToggle } from '../../../project/hooks';
import styles from './Header.module.scss';

export default function AppBar() {
  const {
    close: closeDrawer,
    mounted,
    onAnimationEnd,
    startAnimatingOut,
    toggle,
    toggleRef,
  } = useAnimatedToggle();

  return (
    <>
      <header className={cx(styles.header)}>
        <hgroup className={cx(styles.headerGroup)}>
          <h1 className={cx('type-2')}>Product Feedback</h1>
          <h2 className={cx('type-jost-medium')}>Suggestion Board</h2>
        </hgroup>
        <button
          aria-label="nav drawer"
          className={cx(
            styles.hamburger,
            (mounted && !startAnimatingOut) && styles.hamburgerOpen,
          )}
          onClick={toggle}
          type="button"
        >
          <span className={cx(styles.hamburgerBox)}>
            <span className={cx(styles.hamburgerInner)} />
          </span>
        </button>
      </header>
      {mounted && (
        <>
          <Backdrop
            className={cx(styles.backdrop)}
            show={mounted && !startAnimatingOut}
          />
          {createPortal(
            <Drawer
              closeDrawer={closeDrawer}
              onAnimationEnd={onAnimationEnd}
              startAnimatingOut={startAnimatingOut}
              toggleRef={toggleRef}
            />,
            document.body,
          )}
        </>
      )}
    </>
  );
}
