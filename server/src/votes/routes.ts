import type { FastifyPluginAsync } from 'fastify';
import status from '../lib/httpStatusCodes';
import { createVote } from './queries';
import { createVoteSchema, deleteVoteSchema } from './schemas';

const votesRoutes: FastifyPluginAsync = async (fastify) => {
  // Create vote
  fastify.route<{
    Params: {
      suggestionId: string;
    }
  }>({
    method: 'POST',
    url: '/:suggestionId',
    schema: createVoteSchema,
    preValidation: [fastify.needsAuthentication],
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'suggestion',
      }),
    ],
    handler: async (request, reply) => {
      const { suggestionId } = request.params;
      const userId = request.authUser.id;

      await createVote(fastify.knex, userId, suggestionId);

      reply
        .status(status.HTTP_201_CREATED)
        .send(status.HTTP_201_CREATED);
    },
  });

  // Delete vote
  fastify.route<{
    Params: {
      suggestionId: string;
    }
  }>({
    method: 'DELETE',
    url: '/:suggestionId',
    schema: deleteVoteSchema,
    preValidation: [fastify.needsAuthentication],
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'suggestion',
      }),
    ],
    handler: async (request, reply) => {
      const { suggestionId } = request.params;
      const userId = request.authUser.id;

      await fastify
        .knex('suggestion_vote')
        .where({
          user_id: userId,
          suggestion_id: suggestionId,
        })
        .delete();

      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });
};

export default votesRoutes;
