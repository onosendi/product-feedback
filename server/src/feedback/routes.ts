import type { APICreateOrUpdateFeedback } from '@t/api';
import type { DBCategoryCategory, DBFeedbackStatus, DBId } from '@t/database';
import type {
  FeedbackResponse,
  RoadmapCountResponse,
  SuggestionsResponse,
} from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../project/httpStatusCodes';
import makeSlug from '../project/makeSlug';
import { INSUFFICIENT_PRIVILEGES } from '../project/errors';
import { services as voteServices } from '../votes/plugins';
import { needsAdminToModifyStatus, services } from './plugins';
import {
  createFeedbackSchema,
  deleteFeedbackSchema,
  editFeedbackSchema,
  feedbackDetailSchema,
  listFeedbackSchema,
  roadmapCountSchema,
} from './schemas';

const feedbackRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(services);
  fastify.register(voteServices);
  await fastify.register(needsAdminToModifyStatus);

  // TODO: Make this the roadmap route too with querystring
  // List feedback
  fastify.route<{
    Querystring: {
      category: DBCategoryCategory[],
      order: 'asc' | 'desc',
      sort: 'votes' | 'comment_count',
      status: DBFeedbackStatus[],
    },
  }>({
    method: 'GET',
    url: '/',
    schema: listFeedbackSchema,
    handler: async (request, reply) => {
      const { id: userId } = request.authUser;
      const {
        category,
        status: feedbackStatus,
        sort,
        order,
      } = request.query;

      const feedback = fastify.getFeedbackList(userId);

      if (category) {
        feedback.whereIn('category', category);
      }

      if (feedbackStatus) {
        feedback.whereIn('f.status', feedbackStatus);
      }

      const ordering = order === 'asc' ? 'asc' : 'desc';
      const sorting = ['votes', 'comment_count'].includes(sort) ? sort : 'votes';
      feedback.orderBy(sorting, ordering);

      const response: SuggestionsResponse[] = await feedback;

      reply.status(status.HTTP_200_OK).send(response);
    },
  });

  // Feedback detail
  fastify.route<{
    Params: { slug: string },
  }>({
    method: 'GET',
    url: '/:slug',
    schema: feedbackDetailSchema,
    handler: async (request, reply) => {
      const { id: userId } = request.authUser;
      const { slug } = request.params;

      const feedback: FeedbackResponse = await fastify.getQueryOr404(
        fastify.getFeedbackDetail({ userId, slug }),
      );

      reply.status(status.HTTP_200_OK).send(feedback);
    },
  });

  // Create feedback
  fastify.route<{ Body: APICreateOrUpdateFeedback }>({
    method: 'POST',
    url: '/',
    schema: createFeedbackSchema,
    preValidation: [fastify.needsAuthentication],
    preHandler: [fastify.needsAdminToModifyStatus],
    handler: async (request, reply) => {
      const { id: userId } = request.authUser;
      const {
        category,
        description,
        status: feedbackStatus = 'suggestion',
        title,
      } = request.body;

      const feedbackId = uuidv4();
      const slug = makeSlug(title);
      const { id: categoryId } = await fastify.getCategory(category);

      await fastify.createFeedback({
        categoryId,
        description,
        feedbackId,
        slug,
        status: feedbackStatus,
        title,
        userId,
      });

      const voteId = uuidv4();
      await fastify.createVote({ feedbackId, userId, voteId });

      reply.status(status.HTTP_201_CREATED).send(status.HTTP_201_CREATED);
    },
  });

  // Edit feedback
  fastify.route<{
    Body: APICreateOrUpdateFeedback,
    Params: { feedbackId: DBId },
  }>({
    method: 'PATCH',
    url: '/:feedbackId',
    schema: editFeedbackSchema,
    preValidation: [fastify.needsAuthentication],
    preHandler: [fastify.needsAdminToModifyStatus],
    handler: async (request, reply) => {
      const { role, id: userId } = request.authUser;
      const { feedbackId } = request.params;
      const {
        category,
        description,
        status: feedbackStatus = 'suggestion',
        title,
      } = request.body;

      const feedback = await fastify.getQueryOr404(
        fastify.getFeedback({ id: feedbackId }),
      );

      if (
        (
          userId !== feedback.userId
          || ['in-progress', 'live', 'planned'].includes(feedback.status)
        )
        && role !== 'admin'
      ) {
        throw new Error(INSUFFICIENT_PRIVILEGES);
      }

      const { id: categoryId } = await fastify.getCategory(category);
      await fastify.editFeedback(feedbackId, {
        categoryId,
        description,
        status: feedbackStatus,
        title,
      });

      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });

  // Delete feedback
  fastify.route<{
    Params: { feedbackId: DBId },
  }>({
    method: 'DELETE',
    url: '/:feedbackId',
    schema: deleteFeedbackSchema,
    preValidation: [fastify.needsAuthentication],
    handler: async (request, reply) => {
      const { role, id: userId } = request.authUser;
      const { feedbackId } = request.params;

      const feedback = await fastify.getQueryOr404(
        fastify.getFeedback({ id: feedbackId }),
      );

      if (userId !== feedback.userId && role !== 'admin') {
        throw new Error(INSUFFICIENT_PRIVILEGES);
      }

      await fastify.deleteFeedback(feedbackId);

      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/roadmap-count',
    schema: roadmapCountSchema,
    handler: async (request, reply) => {
      const roadmapCount: RoadmapCountResponse = await fastify.getRoadmapCount();
      reply.status(status.HTTP_200_OK).send(roadmapCount);
    },
  });
};

export default feedbackRoutes;
