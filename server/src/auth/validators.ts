import { body } from 'express-validator';

export const loginPostValidators = [
  body('username').trim(),
];
