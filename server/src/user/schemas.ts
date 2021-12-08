import { FastifySchema } from 'fastify';

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
};
