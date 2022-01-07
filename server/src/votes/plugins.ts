import type { DBId } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import type { Knex } from 'knex';

type VoteArgObj = {
  feedbackId: DBId,
  userId: DBId,
  voteId: DBId,
};

declare module 'fastify' {
  interface FastifyInstance {
    createVote: (obj: VoteArgObj) => Knex.QueryBuilder;
    deleteVote: (obj: Omit<VoteArgObj, 'voteId'>) => Knex.QueryBuilder;
  }
}

export const services: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('createVote', function (obj: any) {
    return fastify
      .knex('feedback_vote')
      .insert({
        id: obj.voteId,
        user_id: obj.userId,
        feedback_id: obj.feedbackId,
      });
  });

  fastify.decorate('deleteVote', function (obj: any) {
    return fastify
      .knex('feedback_vote')
      .where({
        user_id: obj.userId,
        feedback_id: obj.feedbackId,
      })
      .delete();
  });
});
