import type { DBId } from '@t/database';
import type { Knex } from 'knex';

export function getFeedback(knex: Knex, userId: DBId) {
  return knex('feedback as f')
    .select(
      'f.id',
      'f.title',
      'f.slug',
      'f.description',
      'f.status',
      'f.user_id',
      knex.raw('coalesce(votes, 0) as votes'),
      knex.raw('coalesce(comment_count, 0) as comment_count'),
      knex.raw('hv.feedback_id is distinct from null as has_voted'),
      { category: 'fc.display' },
    )
    .join('feedback_category as fc', 'fc.id', 'f.category_id')
    .leftJoin(
      knex('feedback_vote')
        .select('feedback_id', knex.raw('count(id) as votes'))
        .groupBy('feedback_id')
        .as('v'),
      'v.feedback_id',
      '=',
      'f.id',
    )
    .leftJoin(
      knex('feedback_comment')
        .select('feedback_id', knex.raw('count(id) as comment_count'))
        .groupBy('feedback_id')
        .as('c'),
      'c.feedback_id',
      '=',
      'f.id',
    )
    .leftJoin(
      knex('feedback_vote')
        .select('feedback_id')
        .where({ user_id: userId ?? null })
        .groupBy('feedback_id')
        .as('hv'),
      'hv.feedback_id',
      '=',
      'f.id',
    );
}

export function deleteFeedback(knex: Knex, feedbackId: DBId) {
  return knex('feedback')
    .where({ id: feedbackId })
    .delete();
}

export function getRoadmap(knex: Knex, userId: DBId) {
  return getFeedback(knex, userId)
    .whereNot({ 'f.status': 'suggestion' })
    .orderBy('votes', 'desc');
}

export function getRoadmapCount(knex: Knex) {
  return knex('feedback')
    .select(
      knex.raw('sum(case when status=\'planned\' then 1 else 0 end) as planned'),
      knex.raw('sum(case when status=\'in-progress\' then 1 else 0 end) as in_progress'),
      knex.raw('sum(case when status=\'live\' then 1 else 0 end) as live'),
    )
    .first();
}
