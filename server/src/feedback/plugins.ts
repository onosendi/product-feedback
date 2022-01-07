import type {
  DBCategoryCategory,
  DBFeedback,
  DBFeedbackStatus,
  DBId,
} from '@t/database';
import type {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import fp from 'fastify-plugin';
import type { Knex } from 'knex';
import { INSUFFICIENT_PRIVILEGES } from '../project/errors';

type FeedbackArgObj = {
  categoryId: DBId,
  createdAt?: Date,
  description: string,
  feedbackId: DBId,
  slug: string,
  status: DBFeedbackStatus,
  title: string,
  userId: DBId,
};

declare module 'fastify' {
  interface FastifyInstance {
    getFeedback: (where: Partial<DBFeedback>) => Knex.QueryBuilder;
    getFeedbackList: (userId: DBId) => Knex.QueryBuilder;
    getFeedbackDetail: (
      obj: Pick<FeedbackArgObj, 'slug' | 'userId'>,
    ) => Knex.QueryBuilder;
    getCategory: (category: DBCategoryCategory) => Knex.QueryBuilder;
    createFeedback: (obj: FeedbackArgObj) => Knex.QueryBuilder;
    editFeedback: (obj: Omit<FeedbackArgObj, 'slug' | 'userId'>) => Knex.QueryBuilder;
    deleteFeedback: (feedbackId: DBId) => Knex.QueryBuilder;
    getRoadmap: (userId: DBId) => Knex.QueryBuilder;
    getRoadmapCount: () => Knex.QueryBuilder;
  }
}

export const services: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('getFeedbackList', function (userId: any) {
    return fastify.knex('feedback as f')
      .select(
        'f.id',
        'f.title',
        'f.slug',
        'f.description',
        'f.status',
        'f.user_id',
        fastify.knex.raw('coalesce(votes, 0) as votes'),
        fastify.knex.raw('coalesce(comment_count, 0) as comment_count'),
        fastify.knex.raw('hv.feedback_id is distinct from null as has_voted'),
        { category: 'fc.display' },
      )
      .join('feedback_category as fc', 'fc.id', 'f.category_id')
      .leftJoin(
        fastify.knex('feedback_vote')
          .select('feedback_id', fastify.knex.raw('count(id) as votes'))
          .groupBy('feedback_id')
          .as('v'),
        'v.feedback_id',
        '=',
        'f.id',
      )
      .leftJoin(
        fastify.knex('feedback_comment')
          .select('feedback_id', fastify.knex.raw('count(id) as comment_count'))
          .groupBy('feedback_id')
          .as('c'),
        'c.feedback_id',
        '=',
        'f.id',
      )
      .leftJoin(
        fastify.knex('feedback_vote')
          .select('feedback_id')
          .where({ user_id: userId ?? null })
          .groupBy('feedback_id')
          .as('hv'),
        'hv.feedback_id',
        '=',
        'f.id',
      );
  });

  fastify.decorate('getFeedback', function (where: any) {
    return fastify.knex('feedback').where(where).first();
  });

  fastify.decorate('getFeedbackDetail', function (obj: any) {
    return fastify.getFeedbackList(obj.userId).where({ slug: obj.slug }).first();
  });

  fastify.decorate('getCategory', function (category: any) {
    return fastify.knex('feedback_category').select('id').where({ category }).first();
  });

  fastify.decorate('createFeedback', function (obj: any) {
    return fastify.knex('feedback')
      .insert({
        category_id: obj.categoryId,
        description: obj.description,
        id: obj.feedbackId,
        slug: obj.slug,
        status: obj.status,
        title: obj.title,
        user_id: obj.userId,
      });
  });

  fastify.decorate('editFeedback', function (obj: any) {
    return fastify.knex('feedback')
      .update({
        category_id: obj.categoryId,
        description: obj.description,
        status: obj.status,
        title: obj.title,
      })
      .where({ id: obj.feedbackId });
  });

  fastify.decorate('deleteFeedback', function (feedbackId: any) {
    return fastify.knex('feedback').where({ id: feedbackId }).delete();
  });

  fastify.decorate('getRoadmap', function (userId: any) {
    return fastify.getFeedbackList(userId)
      .whereNot({ 'f.status': 'suggestion' })
      .orderBy('votes', 'desc');
  });

  fastify.decorate('getRoadmapCount', function () {
    return fastify.knex('feedback')
      .select(
        fastify.knex.raw('sum(case when status=\'planned\' then 1 else 0 end) as planned'),
        fastify.knex.raw(
          'sum(case when status=\'in-progress\' then 1 else 0 end) as in_progress',
        ),
        fastify.knex.raw('sum(case when status=\'live\' then 1 else 0 end) as live'),
      )
      .first();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    needsAdminToModifyStatus: (
      request: FastifyRequest,
      reply: FastifyReply,
      done: HookHandlerDoneFunction,
    ) => void;
  }
}

export const needsAdminToModifyStatus: FastifyPluginAsync = fp(async (fastify) => {
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
      const { status } = request.body;
      if (status !== 'suggestion' && role !== 'admin') {
        done(new Error(INSUFFICIENT_PRIVILEGES));
      }
      done();
    },
  );
});
