import { FastifyPlugin } from 'fastify';
import { registerSchema } from './schemas';
import status from '../lib/httpStatusCodes';

const userRoutes: FastifyPlugin = (fastify, opts, done) => {
  fastify.route<{
    Body: { username: string, password: string, passwordConfirm: string },
  }>({
    method: 'POST',
    url: '/',
    schema: registerSchema,
    handler: async (request, reply) => {
      reply
        .status(status.HTTP_201_CREATED)
        .send(status.HTTP_201_CREATED);
    },
  });
  done();
};

export default userRoutes;
