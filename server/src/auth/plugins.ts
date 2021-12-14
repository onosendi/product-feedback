import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

const authenticateDecoratorFunc: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        const { userId } = request.user;
        request.user = await fastify
          .knex('user')
          .select(
            'created_at',
            'first_name',
            'id',
            'last_login',
            'last_name',
            'picture',
            'role',
            'username',
          )
          .where({ id: userId })
          .first();
      } catch (error) {
        reply.send(error);
      }
    },
  );

  done();
};
export const authenticateDecorator = fp(authenticateDecoratorFunc);
