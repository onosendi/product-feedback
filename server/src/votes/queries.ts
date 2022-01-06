import type { DBId } from '@t/database';
import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export function createVote(
  knex: Knex,
  userId: DBId,
  feedbackId: DBId,
) {
  return knex('feedback_vote')
    .insert({
      id: uuidv4(),
      user_id: userId,
      feedback_id: feedbackId,
    });
}
