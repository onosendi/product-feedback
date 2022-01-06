import type { APICreateOrUpdateFeedback } from '@t/api';
import type { DBCategoryCategory, DBFeedbackStatus, DBId } from '@t/database';
import type {
  FeedbackResponse,
  RoadmapCountResponse,
  RoadmapResponse,
  SuggestionsResponse,
} from '@t/response';
import type {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import makeSlug from '../lib/makeSlug';
import { createVote } from '../votes/queries';
import {
  deleteFeedback,
  getFeedback,
  getRoadmap,
  getRoadmapCount,
} from './queries';
import {
  createFeedbackSchema,
  deleteFeedbackSchema,
  editFeedbackSchema,
  feedbackDetailSchema,
  listFeedbackSchema,
  roadmapCountSchema,
  roadmapSchema,
} from './schemas';

const feedbackRoutes: FastifyPluginAsync = async (fastify) => {
  // User must have admin to specify a feedback's status
  fastify.decorate(
    'needsAdminToModifyStatus',
    function (
      request: FastifyRequest<{
        Body: { status: DBFeedbackStatus },
      }>,
      reply: FastifyReply,
      done: HookHandlerDoneFunction,
    ) {
      const { role } = request.authUser;

      if (request.body.status && role !== 'admin') {
        const error = new Error('Only administrators can change the status');
        reply
          .status(status.HTTP_403_FORBIDDEN)
          .send(error);
      }

      done();
    },
  );

  // List feedback
  // TODO: Make this the roadmap route too with querystring
  fastify.route<{
    Querystring: {
      category: DBCategoryCategory[],
      order: 'asc' | 'desc',
      sort: 'votes' | 'comment_count',
    },
  }>({
    method: 'GET',
    url: '/',
    schema: listFeedbackSchema,
    handler: async (request, reply) => {
      const userId = request.authUser.id;

      const feedback = getFeedback(fastify.knex, userId)
        .where({ 'f.status': 'suggestion' });

      const { category } = request.query;
      if (category) {
        feedback.whereIn('category', category);
      }

      const order = request.query?.order === 'asc' ? 'asc' : 'desc';
      const sorting = request.query?.sort;
      const sort = ['votes', 'comment_count'].includes(sorting)
        ? sorting
        : 'votes';

      feedback.orderBy(sort, order);

      const response: SuggestionsResponse[] = await feedback;

      reply
        .status(status.HTTP_200_OK)
        .send(response);
    },
  });

  // Feedback detail
  fastify.route<{
    Params: { slug: string },
  }>({
    method: 'GET',
    url: '/:slug',
    schema: feedbackDetailSchema,
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'feedback',
        tableColumn: 'slug',
      }),
    ],
    handler: async (request, reply) => {
      const { id: userId } = request.authUser;
      const { slug } = request.params;

      const feedback: FeedbackResponse = await getFeedback(fastify.knex, userId)
        .where({ slug })
        .first();

      reply
        .status(status.HTTP_200_OK)
        .send(feedback);
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

      await fastify.knex.transaction(async (trx) => {
        const { id: categoryId } = await fastify
          .knex('feedback_category')
          .select('id')
          .where({ category })
          .first()
          .transacting(trx);

        await fastify
          .knex('feedback')
          .insert({
            id: feedbackId,
            title,
            slug,
            description,
            status: feedbackStatus,
            user_id: userId,
            category_id: categoryId,
          })
          .transacting(trx);

        await createVote(fastify.knex, userId, feedbackId)
          .transacting(trx);
      });

      reply
        .status(status.HTTP_201_CREATED)
        .send(status.HTTP_201_CREATED);
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
    preHandler: [
      fastify.needsAdminToModifyStatus,
      fastify.decorateRequestDetail({
        select: ['status', 'title', 'slug'],
        table: 'feedback',
      }),
      fastify.needsOwner,
    ],
    handler: async (request, reply) => {
      // TODO: Don't allow regular users to edit feedback if it's out of
      // 'feedback' status.
      const { detail } = request;
      const { feedbackId } = request.params;

      const {
        category,
        description,
        status: feedbackStatus = detail?.status,
        title,
      } = request.body;

      await fastify.knex.transaction(async (trx) => {
        const { id: categoryId } = await fastify
          .knex('feedback_category')
          .select('id')
          .where({ category })
          .first()
          .transacting(trx);

        await fastify
          .knex('feedback')
          .update({
            category_id: categoryId,
            description,
            status: feedbackStatus,
            title,
          })
          .where({ id: feedbackId })
          .transacting(trx);
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
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'feedback',
      }),
      fastify.needsOwner,
    ],
    handler: async (request, reply) => {
      const { feedbackId } = request.params;
      await deleteFeedback(fastify.knex, feedbackId);
      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/roadmap-count',
    schema: roadmapCountSchema,
    handler: async (request, reply) => {
      const roadmapCount: RoadmapCountResponse = await getRoadmapCount(fastify.knex);
      reply.status(status.HTTP_200_OK).send(roadmapCount);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/roadmap',
    schema: roadmapSchema,
    handler: async (request, reply) => {
      const { id: userId } = request.authUser;
      const roadmap: RoadmapResponse[] = await getRoadmap(fastify.knex, userId);
      reply.status(status.HTTP_200_OK).send(roadmap);
    },
  });
};

export default feedbackRoutes;
