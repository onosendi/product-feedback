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
      const token = fastify.jwt.sign({ userId: 1 });
      reply
        .status(status.HTTP_201_CREATED)
        .send({ token });
    },
  });

  fastify.route({
    method: 'GET',
    url: '/test',
    preValidation: [fastify.authenticate],
    handler: async (request, reply) => {
      const t = await fastify.knex('user');
      console.log(t);
      reply
        .status(status.HTTP_200_OK)
        .send('Yep');
    },
  });

  done();
};

export default userRoutes;
