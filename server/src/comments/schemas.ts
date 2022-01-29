import type { FastifyPluginAsync, FastifySchema } from 'fastify';
import fp from 'fastify-plugin';
import status from '../project/http-status-codes';

export const schema: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addSchema({
    $id: 'comments',
    response: {
      type: 'object',
      properties: {
        content: { type: 'string' },
        emailHash: { type: 'string' },
        feedbackCommentParentId: { type: 'string' },
        feedbackId: { type: 'string' },
        firstName: { type: 'string' },
        id: { type: 'string' },
        lastName: { type: 'string' },
        replies: {
          type: 'array',
          nullable: true,
          items: { $ref: '#/response/properties' },
        },
        username: { type: 'string' },
      },
    },
  });
});

export const listCommentsSchema: FastifySchema = {
  querystring: {
    required: ['feedback_id'],
    properties: {
      feedback_id: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      type: 'array',
      items: { $ref: 'comments#/response' },
    },
  },
};

export const createCommentSchema: FastifySchema = {
  querystring: {
    required: ['feedback_id'],
    properties: {
      feedback_id: { type: 'string', format: 'uuid' },
      parent_id: { type: 'string', format: 'uuid' },
    },
  },
  body: {
    type: 'object',
    required: ['content'],
    properties: {
      content: { type: 'string', maxLength: 255 },
    },
  },
  response: {
    [status.HTTP_200_OK]: { $ref: 'comments#/response' },
  },
};
