import type { DBId } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../project/httpStatusCodes';
import { services } from './plugins';
import { services as feedbackServices } from '../feedback/plugins';
import { createVoteSchema, deleteVoteSchema } from './schemas';

const votesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(services);
  fastify.register(feedbackServices);

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
      await fastify.getQueryOr404(fastify.getFeedback({ id: feedbackId }));
      const { id: userId } = request.authUser;
      const voteId = uuidv4();
      await fastify.createVote({ feedbackId, userId, voteId });
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
      await fastify.getQueryOr404(fastify.getFeedback({ id: feedbackId }));
      const { id: userId } = request.authUser;
      await fastify.deleteVote({ feedbackId, userId });
      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });
};

export default votesRoutes;
