import type { APICreateComment } from '@t/api';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import { getComments } from './queries';
import { createCommentSchema, listCommentsSchema } from './schemas';

const commentRoutes: FastifyPluginAsync = async (fastify) => {
  // List comments
  fastify.route<{
    // TODO: this should use querystring `?suggestionId=...`
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

  // Create comment
  fastify.route<{ Body: APICreateComment }>({
    method: 'POST',
    url: '/',
    schema: createCommentSchema,
    preValidation: [fastify.needsAuthentication],
    handler: async (request, reply) => {
      const { id: userId } = request.authUser;
      const {
        commentParentId = null,
        content,
        suggestionId,
      } = request.body;

      const suggestion = await fastify
        .knex('suggestion')
        .select('id')
        .where({ id: suggestionId })
        .first();
      if (!suggestion) {
        const error = new Error('Record does not exist');
        reply
          .status(status.HTTP_400_BAD_REQUEST)
          .send(error);
      }

      const commentId = uuidv4();

      await fastify
        .knex('suggestion_comment')
        .insert({
          id: commentId,
          content,
          user_id: userId,
          suggestion_id: suggestionId,
          suggestion_comment_parent_id: commentParentId,
        });

      reply
        .status(status.HTTP_201_CREATED)
        .send(status.HTTP_201_CREATED);
    },
  });
};

export default commentRoutes;
