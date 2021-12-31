import type { FastifySchema } from 'fastify';
import status from '../lib/httpStatusCodes';

// TODO: share response schema with auth/schema/loginSchema
export const registerSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['password', 'passwordConfirm', 'username'],
    properties: {
      password: {
        type: 'string',
        minLength: 6,
      },
      passwordConfirm: {
        const: {
          $data: '1/password',
        },
        type: 'string',
      },
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 50,
      },
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

export const userDetailSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['username'],
    properties: {
      username: {
        type: 'string',
      },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      type: 'boolean',
    },
  },
};
