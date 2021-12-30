import type { FastifySchema } from 'fastify';
import status from '../lib/httpStatusCodes';

// TODO: share response schema with user/schema/registerSchema
export const loginSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['password', 'username'],
    properties: {
      password: { type: 'string' },
      username: { type: 'string' },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      type: 'object',
      properties: {
        role: { type: 'string' },
        token: { type: 'string' },
        userId: { type: 'string' },
        username: { type: 'string' },
      },
    },
  },
};
