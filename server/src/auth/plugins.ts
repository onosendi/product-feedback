import { DBUser } from '@t/database';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import status from '../lib/httpStatusCodes';
import { getUserById } from '../user/queries';

const authenticateDecoratorFunc: FastifyPluginAsync = async (fastify) => {
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
};
export const authenticateDecorator = fp(authenticateDecoratorFunc);

const authUser: FastifyPluginAsync = async (fastify) => {
  fastify.addHook(
    'onRequest',
    async (request: FastifyRequest, reply: FastifyReply) => {
      request.authUser = {} as DBUser;
      const authorization = request?.headers?.authorization;
      if (authorization) {
        try {
          const [, token] = authorization.split(' ');
          const decoded = fastify.jwt.decode(token) as {
            iat: string;
            token: string;
            userId: string;
          };
          const { userId } = decoded;
          const user = await getUserById(fastify.knex, userId);
          if (!user) {
            const error = new Error('Invalid user ID');
            reply
              .status(status.HTTP_400_BAD_REQUEST)
              .send(error);
            return;
          }
          request.authUser = user;
        } catch (error) {
          reply.send(error);
        }
      }
    },
  );
};
export const userHook = fp(authUser);
