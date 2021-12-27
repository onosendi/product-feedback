import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import status from '../lib/httpStatusCodes';

const suggestionDetailFunc: FastifyPluginAsync = async (fastify) => {
  fastify.addHook(
    'preHandler',
    async (
      request: FastifyRequest<{
        Params: {
          suggestionId: string;
        },
      }>,
      reply: FastifyReply,
    ) => {
      const { suggestionId } = request.params;

      if (suggestionId) {
        request.detail = await fastify
          .knex('suggestion')
          .where({ id: suggestionId })
          .first();

        if (!request.detail) {
          const error = new Error('Record does not exist');
          reply
            .status(status.HTTP_400_BAD_REQUEST)
            .send(error);
        }
      }
    },
  );
};
export const suggestionDetail = fp(suggestionDetailFunc);
