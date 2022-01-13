import type { DBId } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import type { Knex } from 'knex';

type CreateVoteObj = {
  feedbackId: DBId,
  userId: DBId,
  voteId: DBId,
};

type DeleteVoteObj = Omit<CreateVoteObj, 'voteId'>;

declare module 'fastify' {
  interface FastifyInstance {
    createVote: (obj: CreateVoteObj) => Knex.QueryBuilder;
    deleteVote: (obj: DeleteVoteObj) => Knex.QueryBuilder;
  }
}

export const services: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('createVote', function (obj: CreateVoteObj) {
    return fastify
      .knex('feedback_vote')
      .insert({
        id: obj.voteId,
        user_id: obj.userId,
        feedback_id: obj.feedbackId,
      });
  });

  fastify.decorate('deleteVote', function (obj: DeleteVoteObj) {
    return fastify
      .knex('feedback_vote')
      .where({
        user_id: obj.userId,
        feedback_id: obj.feedbackId,
      })
      .delete();
  });
});
