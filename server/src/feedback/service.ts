import type {
  DBCategoryCategory,
  DBFeedback,
  DBFeedbackStatus,
  DBId,
} from '@t/database';
import BaseService from '../project/service';

export type CreateFeedbackObj = {
  categoryId: DBId,
  createdAt?: Date,
  description: string,
  feedbackId: DBId,
  slug: string,
  status: DBFeedbackStatus,
  title: string,
  userId: DBId,
};

export default class FeedbackService extends BaseService {
  getFeedbackList(userId: DBId) {
    return this
      .fastify.knex('feedback as f')
      .select(
        'f.id',
        'f.title',
        'f.slug',
        'f.description',
        'f.status',
        'f.user_id',
        this.fastify.knex.raw('coalesce(votes, 0) as votes'),
        this.fastify.knex.raw('coalesce(comment_count, 0) as comment_count'),
        this.fastify.knex.raw('hv.feedback_id is distinct from null as has_voted'),
        { category: 'fc.display' },
      )
      .join('feedback_category as fc', 'fc.id', 'f.category_id')
      .leftJoin(
        this.fastify.knex('feedback_vote')
          .select('feedback_id', this.fastify.knex.raw('count(id) as votes'))
          .groupBy('feedback_id')
          .as('v'),
        'v.feedback_id',
        '=',
        'f.id',
      )
      .leftJoin(
        this.fastify.knex('feedback_comment')
          .select('feedback_id', this.fastify.knex.raw('count(id) as comment_count'))
          .groupBy('feedback_id')
          .as('c'),
        'c.feedback_id',
        '=',
        'f.id',
      )
      .leftJoin(
        this.fastify.knex('feedback_vote')
          .select('feedback_id')
          .where({ user_id: userId ?? null })
          .groupBy('feedback_id')
          .as('hv'),
        'hv.feedback_id',
        '=',
        'f.id',
      );
  }

  getFeedback(where: Partial<DBFeedback>) {
    return this.fastify.knex('feedback').where(where).first();
  }

  getFeedbackDetail(obj: {
    slug: string,
    userId: DBId,
  }) {
    return this.getFeedbackList(obj.userId).where({ slug: obj.slug }).first();
  }

  getCategory(category: DBCategoryCategory) {
    return this.fastify.knex('feedback_category').select('id').where({ category }).first();
  }

  createFeedback(obj: CreateFeedbackObj) {
    return this
      .fastify
      .knex('feedback')
      .insert({
        category_id: obj.categoryId,
        description: obj.description,
        id: obj.feedbackId,
        slug: obj.slug,
        status: obj.status,
        title: obj.title,
        user_id: obj.userId,
      });
  }

  editFeedback(
    feedbackId: DBId,
    obj: Omit<CreateFeedbackObj, 'slug' | 'userId' | 'feedbackId'>,
  ) {
    return this
      .fastify
      .knex('feedback')
      .update({
        category_id: obj.categoryId,
        description: obj.description,
        status: obj.status,
        title: obj.title,
      })
      .where({ id: feedbackId });
  }

  deleteFeedback(feedbackId: DBId) {
    return this.fastify.knex('feedback').where({ id: feedbackId }).delete();
  }

  getRoadmapCount() {
    return this
      .fastify.knex('feedback')
      .select(
        this.fastify.knex.raw('sum(case when status=\'planned\' then 1 else 0 end) as planned'),
        this.fastify.knex.raw(
          'sum(case when status=\'in-progress\' then 1 else 0 end) as in_progress',
        ),
        this.fastify.knex.raw('sum(case when status=\'live\' then 1 else 0 end) as live'),
      )
      .first();
  }
}
