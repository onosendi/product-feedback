import type { DBId } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import status from '../lib/httpStatusCodes';
import { createVote } from './queries';
import { createVoteSchema, deleteVoteSchema } from './schemas';

const votesRoutes: FastifyPluginAsync = async (fastify) => {
  // Create vote
  fastify.route<{
    Params: { feedbackId: DBId },
  }>({
    method: 'POST',
    url: '/:feedbackId',
    schema: createVoteSchema,
    preValidation: [fastify.needsAuthentication],
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'feedback',
      }),
    ],
    handler: async (request, reply) => {
      const { feedbackId } = request.params;
      const userId = request.authUser.id;

      await createVote(fastify.knex, userId, feedbackId);

      reply
        .status(status.HTTP_201_CREATED)
        .send(status.HTTP_201_CREATED);
    },
  });

  // Delete vote
  fastify.route<{
    Params: { feedbackId: DBId },
  }>({
    method: 'DELETE',
    url: '/:feedbackId',
    schema: deleteVoteSchema,
    preValidation: [fastify.needsAuthentication],
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'feedback',
      }),
    ],
    handler: async (request, reply) => {
      const { feedbackId } = request.params;
      const userId = request.authUser.id;

      await fastify
        .knex('feedback_vote')
        .where({
          user_id: userId,
          feedback_id: feedbackId,
        })
        .delete();

      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });
};

export default votesRoutes;
