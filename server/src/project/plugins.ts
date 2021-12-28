import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import status from '../lib/httpStatusCodes';

export const requestDetail: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorateRequest('detail', null);
});

export const needsOwner: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate(
    'needsOwner',
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { id: userId, role } = request.authUser;
      const { detail } = request;

      if (!detail) {
        throw new Error('Detail object found');
      }

      if (userId !== detail?.userId && role !== 'admin') {
        const error = new Error('Not the owner');
        reply
          .status(status.HTTP_403_FORBIDDEN)
          .send(error);
      }
    },
  );
});
