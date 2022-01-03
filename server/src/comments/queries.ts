import type { Knex } from 'knex';

export function getComments(knex: Knex, suggestionId: string) {
  return knex('suggestion_comment as sc')
    .select(
      'sc.id',
      'sc.content',
      'sc.suggestion_id',
      'sc.suggestion_comment_parent_id',
      'replies',
      'u.username',
      'u.first_name',
      'u.last_name',
      'u.picture',
    )
    .join('user as u', 'u.id', '=', 'sc.user_id')
    .leftJoin(
      knex('suggestion_comment as sc')
        .select(
          'suggestion_comment_parent_id',
          knex.raw(`
            json_agg(
              json_build_object(
                'id', sc.id,
                'content', content,
                'suggestion_id', sc.suggestion_id,
                'suggestion_comment_parent_id', sc.suggestion_comment_parent_id,
                'username', u.username,
                'first_name', u.first_name,
                'last_name', u.last_name,
                'picture', u.picture
              )
              order by sc.created_at
            ) as replies
          `),
        )
        .join('user as u', 'u.id', '=', 'sc.user_id')
        .groupBy('suggestion_comment_parent_id')
        .as('r'),
      'r.suggestion_comment_parent_id',
      '=',
      'sc.id',
    )
    .orderBy('sc.created_at')
    .whereNull('sc.suggestion_comment_parent_id')
    .where({ 'sc.suggestion_id': suggestionId });
}

export function getCommentById(knex: Knex, commentId: string) {
  return knex('suggestion_comment as sc')
    .select(
      'sc.id',
      'sc.content',
      'sc.suggestion_id',
      'sc.suggestion_comment_parent_id',
      'u.username',
      'u.first_name',
      'u.last_name',
      'u.picture',
    )
    .join('user as u', 'u.id', '=', 'sc.user_id')
    .where({ 'sc.id': commentId })
    .first();
}
