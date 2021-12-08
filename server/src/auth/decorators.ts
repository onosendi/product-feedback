import { FastifyPlugin, FastifyReply, FastifyRequest } from 'fastify';
import FastifyJWT from 'fastify-jwt';
import fp from 'fastify-plugin';

export const authenticate: FastifyPlugin = fp(async (fastify) => {
  fastify.register(FastifyJWT, {
    secret: 'foo',
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.send(error);
      }
    },
  );
});
