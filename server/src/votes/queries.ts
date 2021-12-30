import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export function createVote(
  knex: Knex,
  userId: string,
  suggestionId: string,
) {
  return knex('suggestion_vote')
    .insert({
      id: uuidv4(),
      user_id: userId,
      suggestion_id: suggestionId,
    });
}
