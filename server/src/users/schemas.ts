import type { FastifySchema } from 'fastify';
import status from '../lib/httpStatusCodes';

// TODO: share response schema with auth/schema/loginSchema
export const registerSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['password', 'passwordConfirm', 'username'],
    properties: {
      password: {
        minLength: 6,
        type: 'string',
      },
      passwordConfirm: {
        const: {
          $data: '1/password',
        },
        type: 'string',
      },
      username: { type: 'string' },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      type: 'object',
      properties: {
        role: { type: 'string' },
        token: { type: 'string' },
        username: { type: 'string' },
      },
    },
  },
};
