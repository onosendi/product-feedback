import { FastifyPluginCallback } from 'fastify';
import { tokenSchema } from './schemas';

const authRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.route<{
    Body: { username: string, password: string },
  }>({
    url: '/token',
    method: 'POST',
    handler: async (request) => {
      const { username, password = '' } = request.body;
      // eslint-disable-next-line no-console
      console.log(username, password);
      return { foo: 'bar' };
    },
    schema: tokenSchema,
  });
  done();
};

export default authRoutes;
