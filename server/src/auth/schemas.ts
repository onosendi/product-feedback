import type { FastifyPluginAsync, FastifySchema } from 'fastify';
import fp from 'fastify-plugin';
import status from '../project/httpStatusCodes';

export const schema: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addSchema({
    $id: 'auth',
    type: 'object',
    responses: {
      login: {
        type: 'object',
        properties: {
          role: { type: 'string' },
          token: { type: 'string' },
          userId: { type: 'string' },
          username: { type: 'string' },
        },
      },
    },
  });
});

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
      $ref: 'auth#/responses/login',
    },
  },
};
