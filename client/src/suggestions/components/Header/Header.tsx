import cx from 'clsx';
import { createPortal } from 'react-dom';
import { Drawer } from '..';
import { Backdrop } from '../../../components';
import { useAnimatedToggle } from '../../../hooks';
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
          <h1 className={cx('type-2')}>Frontend Mentor</h1>
          <h2 className={cx('type-jost-medium')}>Feedback Board</h2>
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
