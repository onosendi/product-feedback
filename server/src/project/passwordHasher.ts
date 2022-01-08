import crypto from 'crypto';

function hashPbkdf2(password: string, salt: string) {
  return crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
}

export function createPassword(
  password: string,
  salt: string | null = null,
) {
  const newSalt = salt || crypto.randomBytes(16).toString('hex');
  const pbkdf2 = hashPbkdf2(password, newSalt);
  return `${newSalt}$${pbkdf2}`;
}

export function checkPassword(password: string, encoded: string) {
  try {
    const [salt, hash] = encoded.split('$');
    const pbkdf2 = hashPbkdf2(password, salt);
    return pbkdf2 === hash;
  } catch {
    return false;
  }
}
