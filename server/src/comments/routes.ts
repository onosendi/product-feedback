import type { FastifyPluginAsync } from 'fastify';
import status from '../lib/httpStatusCodes';
import { getComments } from './queries';
import { listCommentsSchema } from './schemas';

const commentRoutes: FastifyPluginAsync = async (fastify) => {
  // List comments
  fastify.route<{
    Params: { suggestionId: string },
  }>({
    method: 'GET',
    url: '/:suggestionId',
    schema: listCommentsSchema,
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'suggestion',
      }),
    ],
    handler: async (request, reply) => {
      const { suggestionId } = request.params;

      const comments = await getComments(fastify.knex, suggestionId);

      reply
        .status(status.HTTP_200_OK)
        .send(comments);
    },
  });
};

export default commentRoutes;
