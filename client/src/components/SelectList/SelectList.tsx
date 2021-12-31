import cx from 'clsx';
import type { Options as FocusTrapOptions } from 'focus-trap';
import FocusTrap from 'focus-trap-react';
import type { ElementType, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';

interface SelectListProps {
  children: ReactNode;
  className?: string | null;
  focusTrapOptions?: FocusTrapOptions;
  listComponent?: ElementType | string;
  listItemComponent?: ElementType | string;
  onAnimationEnd?: VoidFunction;
  onSelect?: (obj: {
    value: string,
    children: string,
  }) => void;
  selectedValue?: string | null;
}

const SelectList = forwardRef<any, SelectListProps>(({
  children,
  className = null,
  focusTrapOptions = {},
  listComponent: ListComponent = 'ul',
  listItemComponent: ListItemComponent = 'li',
  onAnimationEnd = () => {},
  onSelect = () => {},
  selectedValue = null,
}, fRef) => {
  const modifiedChildren = Children.map(children, (child) => {
    const item = child as ReactElement;
    return cloneElement(
      item,
      {
        onClick: () => {
          onSelect({ value: item.props.value, children: item.props.children });
        },
        selected: item.props.value === selectedValue,
      },
      item.props.children,
    );
  });

  return (
    <FocusTrap focusTrapOptions={focusTrapOptions}>
      <ListComponent
        className={cx(className)}
        onAnimationEnd={onAnimationEnd}
        ref={fRef}
      >
        {Children.map(modifiedChildren, (child) => (
          <ListItemComponent>
            {child}
          </ListItemComponent>
        ))}
      </ListComponent>
    </FocusTrap>
  );
});

export default SelectList;
