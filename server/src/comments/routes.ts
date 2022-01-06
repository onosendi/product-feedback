import type { APICreateComment } from '@t/api';
import type { DBId } from '@t/database';
import type { CommentResponse } from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import { getCommentById, getComments } from './queries';
import { createCommentSchema, listCommentsSchema } from './schemas';

const commentRoutes: FastifyPluginAsync = async (fastify) => {
  // List comments
  fastify.route<{
    Querystring: { feedback_id: DBId },
  }>({
    method: 'GET',
    url: '/',
    schema: listCommentsSchema,
    handler: async (request, reply) => {
      const { feedback_id: feedbackId } = request.query;

      const feedback = await fastify
        .knex('feedback')
        .select('id')
        .where({ id: feedbackId })
        .first();
      if (!feedback) {
        const error = new Error('Record does not exist');
        reply
          .status(status.HTTP_400_BAD_REQUEST)
          .send(error);
      }

      const comments: CommentResponse[] = await getComments(fastify.knex, feedbackId);

      reply
        .status(status.HTTP_200_OK)
        .send(comments);
    },
  });

  // Create comment
  fastify.route<{
    Body: APICreateComment,
    Querystring: {
      parent_id?: DBId | null,
      feedback_id: DBId,
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
        feedback_id: feedbackId,
      } = request.query;

      const feedback = await fastify
        .knex('feedback')
        .select('id')
        .where({ id: feedbackId })
        .first();
      if (!feedback) {
        const error = new Error('Record does not exist');
        reply
          .status(status.HTTP_400_BAD_REQUEST)
          .send(error);
      }

      try {
        await fastify.knex.transaction(async (trx) => {
          const commentId = uuidv4();

          await fastify
            .knex('feedback_comment')
            .insert({
              id: commentId,
              content,
              user_id: userId,
              feedback_id: feedbackId,
              feedback_comment_parent_id: commentParentId,
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
