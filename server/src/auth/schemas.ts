import { FastifySchema } from 'fastify';

export const postTokenSchema: FastifySchema = {
  body: {
    properties: {
      password: { type: 'string' },
      username: { type: 'string' },
    },
    required: ['password', 'username'],
    type: 'object',
  },
  response: {
    200: {
      properties: {
        foo: { type: 'string' },
      },
      type: 'object',
    },
  },
};
