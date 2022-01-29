import type { DBId } from '@t/database';
import BaseService from '../project/service';

type CreateVoteObj = {
  feedbackId: DBId,
  userId: DBId,
  voteId: DBId,
};

type DeleteVoteObj = Omit<CreateVoteObj, 'voteId'>;

export default class VoteService extends BaseService {
  createVote(obj: CreateVoteObj) {
    return this
      .fastify
      .knex('feedback_vote')
      .insert({
        id: obj.voteId,
        user_id: obj.userId,
        feedback_id: obj.feedbackId,
      });
  }

  deleteVote(obj: DeleteVoteObj) {
    return this
      .fastify
      .knex('feedback_vote')
      .where({
        user_id: obj.userId,
        feedback_id: obj.feedbackId,
      })
      .delete();
  }
}
