import { FastifySchema } from 'fastify';
import status from '../lib/httpStatusCodes';

export const tokenSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['password', 'username'],
    properties: {
      password: { type: 'string' },
      username: { type: 'string' },
    },
  },
  response: {
    [status.HTTP_201_CREATED]: {
      type: 'object',
      properties: {
        foo: { type: 'string' },
      },
    },
  },
};
