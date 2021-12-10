import { FastifyPlugin, FastifyReply, FastifyRequest } from 'fastify';
import FastifyJWT, { FastifyJWTOptions } from 'fastify-jwt';
import fp from 'fastify-plugin';

export const authenticate: FastifyPlugin<FastifyJWTOptions> = fp(async (fastify, opts) => {
  fastify.register(FastifyJWT, opts);

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
});
