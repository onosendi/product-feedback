// TODO: routes need to make sure suggestion ID exists
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
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
    preValidation: [fastify.authenticate],
    handler: async (request, reply) => {
      const { suggestionId } = request.params;
      const userId = request.authUser.id;

      await fastify
        .knex('suggestion_vote')
        .insert({
          id: uuidv4(),
          user_id: userId,
          suggestion_id: suggestionId,
        });

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
    preValidation: [fastify.authenticate],
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
