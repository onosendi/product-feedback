import type { ModifyVoteResponse } from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import { createVoteSchema, deleteVoteSchema } from './schemas';

const votesRoutes: FastifyPluginAsync = async (fastify) => {
  // Create vote
  fastify.route<{
    Params: {
      id: string;
    }
  }>({
    method: 'POST',
    url: '/:id',
    schema: createVoteSchema,
    preValidation: [fastify.authenticate],
    handler: async (request, reply) => {
      const { id: suggestionId } = request.params;
      const userId = request.authUser.id;

      await fastify
        .knex('suggestion_vote')
        .insert({
          id: uuidv4(),
          user_id: userId,
          suggestion_id: suggestionId,
        });

      const response: ModifyVoteResponse = { suggestionId };

      reply
        .status(status.HTTP_201_CREATED)
        .send(response);
    },
  });

  // Delete vote
  fastify.route<{
    Params: {
      id: string;
    }
  }>({
    method: 'DELETE',
    url: '/:id',
    schema: deleteVoteSchema,
    preValidation: [fastify.authenticate],
    handler: async (request, reply) => {
      const { id: suggestionId } = request.params;
      const userId = request.authUser.id;

      await fastify
        .knex('suggestion_vote')
        .where({
          user_id: userId,
          suggestion_id: suggestionId,
        })
        .delete();

      const response: ModifyVoteResponse = { suggestionId };

      reply
        .status(status.HTTP_200_OK)
        .send(response);
    },
  });
};

export default votesRoutes;
