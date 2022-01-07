import type { DBId } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import type { Knex } from 'knex';

type CommentArgObj = {
  commentId: DBId,
  content: string,
  createdAt?: Date,
  feedbackCommentParentId?: DBId | null,
  feedbackId: DBId,
  userId: DBId,
};

declare module 'fastify' {
  interface FastifyInstance {
    getComments: (feedbackId: DBId) => Knex.QueryBuilder;
    getCommentById: (commentId: DBId) => Knex.QueryBuilder;
    createComment: (obj: CommentArgObj) => Knex.QueryBuilder;
  }
}

export const services: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('getComments', function (feedbackId: any) {
    return fastify
      .knex('feedback_comment as fc')
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
        fastify.knex('feedback_comment as fc')
          .select(
            'feedback_comment_parent_id',
            fastify.knex.raw(`
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
  });

  fastify.decorate('getCommentById', function (commentId: any) {
    return fastify
      .knex('feedback_comment as fc')
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
  });

  fastify.decorate('createComment', function (obj: any) {
    return fastify
      .knex('feedback_comment')
      .insert({
        id: obj.commentId,
        content: obj.content,
        user_id: obj.userId,
        feedback_id: obj.feedbackId,
        feedback_comment_parent_id: obj.commentParentId,
      });
  });
});
