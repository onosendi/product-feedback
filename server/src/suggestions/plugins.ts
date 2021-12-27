import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import status from '../lib/httpStatusCodes';

const validateDetailIdFunc: FastifyPluginAsync = async (fastify) => {
  fastify.decorate(
    'validateDetailId',
    async (
      request: FastifyRequest<{
        Params: {
          suggestionId: string;
        },
      }>,
      reply: FastifyReply,
    ) => {
      const { suggestionId } = request.params;

      let error;

      if (suggestionId) {
        const suggestion = await fastify
          .knex('suggestion')
          .select('id')
          .where({ id: suggestionId })
          .first();

        if (!suggestion) {
          error = new Error('Invalid suggestion ID');
        }
      }

      if (error) {
        reply
          .status(status.HTTP_400_BAD_REQUEST)
          .send(error);
      }
    },
  );
};
export const validateDetailId = fp(validateDetailIdFunc);
