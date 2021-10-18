import { FastifyPluginCallback, RouteShorthandOptionsWithHandler } from 'fastify';
import { token } from './controllers';

const tokenOptions = {
  handler: token,
  schema: {
    body: {
      type: 'object',
      required: ['password', 'username'],
      properties: {
        password: { type: 'string' },
        username: { type: 'string' },
      },
    },
  },
};

const authRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.post('/token', tokenOptions as RouteShorthandOptionsWithHandler);
  done();
};

export default authRoutes;
