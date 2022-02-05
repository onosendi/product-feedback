import type { DBId } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../project/http-status-codes';
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
    handler: async (request, reply) => {
      const { feedbackId } = request.params;
      await fastify.getQueryOr404(
        fastify.feedbackService.getFeedback({ id: feedbackId }),
      );
      const { id: userId } = request.authUser;
      const voteId = uuidv4();
      await fastify.voteService.createVote({ feedbackId, userId, voteId });
      reply.status(status.HTTP_201_CREATED).send(status.HTTP_201_CREATED);
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
    handler: async (request, reply) => {
      const { feedbackId } = request.params;
      await fastify.getQueryOr404(
        fastify.feedbackService.getFeedback({ id: feedbackId }),
      );
      const { id: userId } = request.authUser;
      await fastify.voteService.deleteVote({ feedbackId, userId });
      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });
};

export default votesRoutes;
