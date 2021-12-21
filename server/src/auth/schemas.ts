import type { FastifySchema } from 'fastify';

export const tokenSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['password', 'username'],
    properties: {
      password: { type: 'string' },
      username: { type: 'string' },
    },
  },
};
