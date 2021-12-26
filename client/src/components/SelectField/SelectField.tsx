import cx from 'clsx';
import type { ReactNode } from 'react';
import { InputLabel, SelectCaret, SelectList } from '..';
import {
  useAnimatedToggle,
  useKeyDown,
  useOutsideClick,
  useSelectValue,
} from '../../hooks';
import styles from './SelectField.module.scss';

interface SelectFieldProps {
  children: ReactNode;
  className?: string | null;
  defaultValue?: string | null;
  description?: string | null;
  error?: boolean;
  helperText?: string | null;
  id: string;
  label: string;
  name: string;
}

export default function SelectField({
  children,
  className = null,
  defaultValue = null,
  description = null,
  error = false,
  helperText = null,
  id,
  label,
  name,
}: SelectFieldProps) {
  const {
    close,
    mounted,
    onAnimationEnd,
    startAnimatingOut: out,
    toggle,
    toggleRef,
  } = useAnimatedToggle();

  const [display, setDisplay] = useSelectValue(children, defaultValue);

  const onSelect = (obj: { value: string; children: string; }) => {
    close();
    setDisplay(obj.children);
  };

  useOutsideClick(close, toggleRef, mounted);
  useKeyDown({ Escape: close }, mounted);

  return (
    <div className={cx(styles.wrapper)}>
      <InputLabel
        description={description}
        error={error}
        helperText={helperText}
        htmlFor={id}
        label={label}
      >
        <button
          className={cx(
            'type-body2',
            styles.button,
            mounted && styles.selected,
            className,
          )}
          onClick={toggle}
          ref={toggleRef}
          type="button"
        >
          {display}
          <SelectCaret open={mounted && !out} />
        </button>
        <input
          id={id}
          name={name}
          type="hidden"
          defaultValue={display.toLowerCase()}
        />
      </InputLabel>
      {mounted && (
        <SelectList
          className={cx(
            'select-list',
            out ? 'fade-close' : 'fade-open',
          )}
          focusTrapOptions={{
            allowOutsideClick: true,
            initialFocus: false,
          }}
          onAnimationEnd={onAnimationEnd}
          onSelect={onSelect}
          selectedValue={display}
        >
          {children}
        </SelectList>
      )}
    </div>
  );
}
