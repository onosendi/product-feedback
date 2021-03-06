import type { FastifyPluginAsync, FastifySchema } from 'fastify';
import fp from 'fastify-plugin';
import status from '../project/http-status-codes';

export const schema: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addSchema({
    $id: 'auth/response',
    login: {
      type: 'object',
      properties: {
        emailHash: { type: 'string' },
        role: { type: 'string' },
        token: { type: 'string' },
        userId: { type: 'string' },
        username: { type: 'string' },
      },
    },
  });
});

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
      $ref: 'auth/response#/login',
    },
  },
};
