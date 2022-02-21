import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export function renderApp(children: ReactNode) {
  return render(
    <Provider store={store}>
      {children}
    </Provider>,
  );
}
