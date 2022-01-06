import type { Knex } from 'knex';

export function getSuggestions(knex: Knex, userId: string) {
  return knex('suggestion as s')
    .select(
      's.id',
      's.title',
      's.slug',
      's.description',
      's.status',
      's.user_id',
      // TODO: rename votes -> vote_count
      knex.raw('coalesce(votes, 0) as votes'),
      knex.raw('coalesce(comment_count, 0) as comment_count'),
      knex.raw('hv.suggestion_id is distinct from null as has_voted'),
      { category: 'sc.display' },
    )
    .join('suggestion_category as sc', 'sc.id', 's.category_id')
    .leftJoin(
      knex('suggestion_vote')
        .select('suggestion_id', knex.raw('count(id) as votes'))
        .groupBy('suggestion_id')
        .as('v'),
      'v.suggestion_id',
      '=',
      's.id',
    )
    .leftJoin(
      knex('suggestion_comment')
        .select('suggestion_id', knex.raw('count(id) as comment_count'))
        .groupBy('suggestion_id')
        .as('c'),
      'c.suggestion_id',
      '=',
      's.id',
    )
    .leftJoin(
      knex('suggestion_vote')
        .select('suggestion_id')
        .where({ user_id: userId ?? null })
        .groupBy('suggestion_id')
        .as('hv'),
      'hv.suggestion_id',
      '=',
      's.id',
    );
}

export function getRoadmap(knex: Knex, userId: string) {
  return getSuggestions(knex, userId)
    .select('s.status')
    .whereNot({ 's.status': 'suggestion' })
    .orderBy('votes', 'desc');
}

export function getRoadmapCount(knex: Knex) {
  return knex('suggestion')
    .select(
      knex.raw('sum(case when status=\'planned\' then 1 else 0 end) as planned'),
      knex.raw('sum(case when status=\'in-progress\' then 1 else 0 end) as in_progress'),
      knex.raw('sum(case when status=\'live\' then 1 else 0 end) as live'),
    )
    .first();
}
