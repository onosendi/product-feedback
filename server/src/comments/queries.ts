import type { DBId } from '@t/database';
import type { Knex } from 'knex';

export function getComments(knex: Knex, feedbackId: DBId) {
  return knex('feedback_comment as fc')
    .select(
      'fc.id',
      'fc.content',
      'fc.feedback_id',
      'fc.feedback_comment_parent_id',
      'replies',
      'u.username',
      'u.first_name',
      'u.last_name',
      'u.picture',
    )
    .join('user as u', 'u.id', '=', 'fc.user_id')
    .leftJoin(
      knex('feedback_comment as fc')
        .select(
          'feedback_comment_parent_id',
          knex.raw(`
            json_agg(
              json_build_object(
                'id', fc.id,
                'content', content,
                'feedback_id', fc.feedback_id,
                'feedback_comment_parent_id', fc.feedback_comment_parent_id,
                'username', u.username,
                'first_name', u.first_name,
                'last_name', u.last_name,
                'picture', u.picture
              )
              order by fc.created_at
            ) as replies
          `),
        )
        .join('user as u', 'u.id', '=', 'fc.user_id')
        .groupBy('feedback_comment_parent_id')
        .as('r'),
      'r.feedback_comment_parent_id',
      '=',
      'fc.id',
    )
    .orderBy('fc.created_at')
    .whereNull('fc.feedback_comment_parent_id')
    .where({ 'fc.feedback_id': feedbackId });
}

export function getCommentById(knex: Knex, commentId: DBId) {
  return knex('feedback_comment as fc')
    .select(
      'fc.id',
      'fc.content',
      'fc.feedback_id',
      'fc.feedback_comment_parent_id',
      'u.username',
      'u.first_name',
      'u.last_name',
      'u.picture',
    )
    .join('user as u', 'u.id', '=', 'fc.user_id')
    .where({ 'fc.id': commentId })
    .first();
}
