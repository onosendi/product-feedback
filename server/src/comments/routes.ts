import type { APICreateComment } from '@t/api';
import type { CommentResponse } from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import { getCommentById, getComments } from './queries';
import { createCommentSchema, listCommentsSchema } from './schemas';

const commentRoutes: FastifyPluginAsync = async (fastify) => {
  // List comments
  fastify.route<{
    Querystring: { suggestion_id: string },
  }>({
    method: 'GET',
    url: '/',
    schema: listCommentsSchema,
    handler: async (request, reply) => {
      const { suggestion_id: suggestionId } = request.query;

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

      const comments: CommentResponse[] = await getComments(fastify.knex, suggestionId);

      reply
        .status(status.HTTP_200_OK)
        .send(comments);
    },
  });

  // Create comment
  fastify.route<{
    Body: APICreateComment,
    Querystring: {
      parent_id?: string | null,
      suggestion_id: string,
    },
  }>({
    method: 'POST',
    url: '/',
    schema: createCommentSchema,
    preValidation: [fastify.needsAuthentication],
    handler: async (request, reply) => {
      const { id: userId } = request.authUser;
      const { content } = request.body;
      const {
        parent_id: commentParentId = null,
        suggestion_id: suggestionId,
      } = request.query;

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

      try {
        await fastify.knex.transaction(async (trx) => {
          const commentId = uuidv4();

          await fastify
            .knex('suggestion_comment')
            .insert({
              id: commentId,
              content,
              user_id: userId,
              suggestion_id: suggestionId,
              suggestion_comment_parent_id: commentParentId,
            })
            .transacting(trx);

          const comment: CommentResponse = await getCommentById(fastify.knex, commentId)
            .transacting(trx);

          reply
            .status(status.HTTP_201_CREATED)
            .send(comment);
        });
      } catch {
        throw new Error();
      }
    },
  });
};

export default commentRoutes;
