import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import status from '../lib/httpStatusCodes';
import { checkPassword } from '../lib/passwordHasher';
import { getUserByUsername } from './queries';
import { loginPostValidators } from './validators';

export const loginPost = [
  ...loginPostValidators,

  asyncHandler(async (req, res) => {
    const { username, password = '' } = req.body;

    const user: {
      id: string,
      password: string,
    } = await getUserByUsername(username);

    if (!user || !checkPassword(password, user.password)) {
      res.sendStatus(status.HTTP_401_UNAUTHORIZED);
      return;
    }

    const token = jwt.sign({ foo: 'bar' }, 'testing');

    res.cookie('refreshtoken', token, { httpOnly: true, sameSite: 'lax' });
    res.sendStatus(status.HTTP_201_CREATED);
  }),
];
