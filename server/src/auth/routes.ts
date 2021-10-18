import { FastifyPluginCallback } from 'fastify';

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
  });
  done();
};

export default authRoutes;
