import type { DBId, DBUser } from '@t/database';
import type { FastifyPluginAsync, FastifyReply, FastifyRequest as FR } from 'fastify';
import fp from 'fastify-plugin';
import { INVALID_USER_ID } from '../project/errors';

declare module 'fastify' {
  interface FastifyInstance {
    needsAuthentication: (request: FastifyRequest, reply: FastifyReply) => void;
  }
}
export const needsAuthentication: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate(
    'needsAuthentication',
    async function (request: FR, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.send(error);
      }
    },
  );
});

declare module 'fastify' {
  interface FastifyRequest {
    authUser: DBUser;
  }
}
export const authUser: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorateRequest('authUser', null);

  fastify.addHook(
    'preHandler',
    async (request: FR, reply: FastifyReply) => {
      request.authUser = {} as DBUser;
      const { authorization } = request.headers;
      if (authorization) {
        try {
          const [, token] = authorization.split(' ');
          const decoded = fastify.jwt.decode(token) as {
            iat: string,
            token: string,
            userId: DBId,
          };
          const { userId } = decoded;
          const user = await fastify.userService.getUser({ id: userId });
          if (!user) {
            throw new Error(INVALID_USER_ID);
          }
          request.authUser = user;
        } catch (error) {
          reply.send(error);
        }
      }
    },
  );
});
