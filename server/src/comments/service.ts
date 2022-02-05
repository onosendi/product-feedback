import type { DBId } from '@t/database';
import BaseService from '../project/service';

export default class CommentService extends BaseService {
  getComments(feedbackId: DBId) {
    return this
      .fastify
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
        'u.email_hash',
      )
      .join('user as u', 'u.id', '=', 'fc.user_id')
      .leftJoin(
        this.fastify.knex('feedback_comment as fc')
          .select(
            'feedback_comment_parent_id',
            this.fastify.knex.raw(`
              json_agg(
                json_build_object(
                  'id', fc.id,
                  'content', content,
                  'feedback_id', fc.feedback_id,
                  'feedback_comment_parent_id', fc.feedback_comment_parent_id,
                  'username', u.username,
                  'first_name', u.first_name,
                  'last_name', u.last_name,
                  'email_hash', u.email_hash
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

  getCommentById(commentId: DBId) {
    return this
      .fastify
      .knex('feedback_comment as fc')
      .select(
        'fc.id',
        'fc.content',
        'fc.feedback_id',
        'fc.feedback_comment_parent_id',
        'u.username',
        'u.first_name',
        'u.last_name',
        'u.email_hash',
      )
      .join('user as u', 'u.id', '=', 'fc.user_id')
      .where({ 'fc.id': commentId })
      .first();
  }

  createComment(obj: {
    commentId: DBId,
    content: string,
    feedbackCommentParentId?: DBId | null,
    feedbackId: DBId,
    userId: DBId,
  }) {
    return this
      .fastify
      .knex('feedback_comment')
      .insert({
        id: obj.commentId,
        content: obj.content,
        user_id: obj.userId,
        feedback_id: obj.feedbackId,
        feedback_comment_parent_id: obj.feedbackCommentParentId,
      });
  }
}
