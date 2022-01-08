import type { DBId, DBUser } from '@t/database';
import type { FastifyPluginAsync, FastifyReply, FastifyRequest as FR } from 'fastify';
import fp from 'fastify-plugin';
import status from '../project/httpStatusCodes';
import { services as userServices } from '../users/plugins';

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
  fastify.register(userServices);

  fastify.decorateRequest('authUser', null);

  fastify.addHook(
    'preHandler',
    async (request: FR, reply: FastifyReply) => {
      request.authUser = {} as DBUser;
      const authorization = request?.headers?.authorization;
      if (authorization) {
        // TODO Do we need try catch here?
        try {
          const [, token] = authorization.split(' ');
          const decoded = fastify.jwt.decode(token) as {
            iat: string,
            token: string,
            userId: DBId,
          };
          const { userId } = decoded;
          const user = await fastify.getUser({ id: userId });
          if (!user) {
            // TODO use error handling to handle this
            const error = new Error('Invalid user ID');
            reply.status(status.HTTP_400_BAD_REQUEST).send(error);
            return;
          }
          request.authUser = user;
        } catch (error) {
          reply.send(error);
        }
      }
    },
  );
});
