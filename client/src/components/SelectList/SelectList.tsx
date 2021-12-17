import cx from 'clsx';
import FocusTrap from 'focus-trap-react';
import { Options as FocusTrapOptions } from 'focus-trap';
import React, {
  Children,
  cloneElement,
  ElementType,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react';

interface SelectListProps {
  children: ReactElement[];
  className?: string | null;
  focusTrapOptions?: FocusTrapOptions;
  listComponent?: ElementType | string;
  listItemComponent?: ElementType | string;
  onSelect?: (value: {
    value: string;
    children: ReactNode;
  }) => void;
  selectedValue?: string | null;
}

const SelectList = forwardRef<any, SelectListProps>(({
  children,
  className = null,
  focusTrapOptions = {},
  listComponent: ListComponent = 'ul',
  listItemComponent: ListItemComponent = 'li',
  onSelect = () => {},
  selectedValue = null,
}, fRef) => {
  const modifiedChildren = Children.map(children, (child: ReactElement) => cloneElement(
    child,
    {
      'data-selected': child.props.value === selectedValue,
      onClick: () => {
        onSelect({ value: child.props.value, children: child.props.children });
      },
    },
    child.props.children,
  ));

  return (
    <FocusTrap focusTrapOptions={focusTrapOptions}>
      <ListComponent
        className={cx(className)}
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
