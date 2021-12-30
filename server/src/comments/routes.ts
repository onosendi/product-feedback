import type { DBSuggestion } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import status from '../lib/httpStatusCodes';
import { getComments } from './queries';
import { listCommentsSchema } from './schemas';

const commentRoutes: FastifyPluginAsync = async (fastify) => {
  // List comments
  fastify.route<{
    Params: {
      slug: string;
    },
  }>({
    method: 'GET',
    url: '/:slug',
    schema: listCommentsSchema,
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'suggestion',
        tableColumn: 'slug',
      }),
    ],
    handler: async (request, reply) => {
      const { id: suggestionId } = request.detail as DBSuggestion;

      const comments = await getComments(fastify.knex, suggestionId);

      reply
        .status(status.HTTP_200_OK)
        .send(comments);
    },
  });
};

export default commentRoutes;
