import { checkPassword, createPassword } from '../passwordHasher';

const password = 'testing';
const salt = 'testing';
const encoded = `${salt}$2cd9e7344c2a3eb5b7853f3aade3b3c2c0004f40efca202da5ca386d270b8f4c68731ec08bf12e7419f3fbefad3559d9130d0189d189c2547f543d69502a185e`;

test('Create password', () => {
  const createdPassword = createPassword(password, salt);
  expect(encoded).toBe(createdPassword);
});

test('Check password', () => {
  const checkedPassword = checkPassword(password, encoded);
  expect(checkedPassword).toBeTruthy();
});
