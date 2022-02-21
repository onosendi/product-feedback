import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from '../../../../project/test-utils';
import { REQUIRED } from '../../../../project/validators';
import LoginForm from '../LoginForm';

beforeEach(() => {
  renderApp(<LoginForm />);
});

test('Button should be disabled', () => {
  const button = screen.getByRole('button', { name: /login/i });
  expect(button).toBeDisabled();
});

test('Button should be enabled when fields have a value', () => {
  const button = screen.getByRole('button', { name: /login/i });
  const username = screen.getByLabelText(/username/i);
  const password = screen.getByLabelText(/password/i);
  [username, password].forEach((input) => {
    userEvent.type(input, 'testing');
  });
  expect(button).toBeEnabled();
});

test('Username should be required', () => {
  const username = screen.getByLabelText(/username/i);
  fireEvent.blur(username);
  const errorMessage = screen.getByTestId('helper-text').textContent;
  expect(errorMessage).toBe(REQUIRED);
});

test('Password should be required', () => {
  const password = screen.getByLabelText(/password/i);
  fireEvent.blur(password);
  const errorMessage = screen.getByTestId('helper-text').textContent;
  expect(errorMessage).toBe(REQUIRED);
});
