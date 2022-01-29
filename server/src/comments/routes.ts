import type { APICreateComment } from '@t/api';
import type { DBId } from '@t/database';
import type { CommentResponse } from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../project/http-status-codes';
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

      await fastify.getQueryOr404(
        fastify.feedbackService.getFeedback({ id: feedbackId }),
      );

      const comments: CommentResponse[] = await fastify
        .commentService
        .getComments(feedbackId);

      reply.status(status.HTTP_200_OK).send(comments);
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
        parent_id: feedbackCommentParentId = null,
        feedback_id: feedbackId,
      } = request.query;

      await fastify.getQueryOr404(
        fastify.feedbackService.getFeedback({ id: feedbackId }),
      );

      if (feedbackCommentParentId) {
        await fastify.getQueryOr404(
          fastify.commentService.getCommentById(feedbackCommentParentId),
        );
      }

      const commentId = uuidv4();

      await fastify.commentService.createComment({
        commentId,
        content,
        userId,
        feedbackId,
        feedbackCommentParentId,
      });

      const comment: CommentResponse = await fastify
        .commentService
        .getCommentById(commentId);

      reply.status(status.HTTP_201_CREATED).send(comment);
    },
  });
};

export default commentRoutes;
