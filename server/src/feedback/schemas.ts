import type { FastifyPluginAsync, FastifySchema } from 'fastify';
import fp from 'fastify-plugin';
import status from '../project/http-status-codes';

export const schema: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addSchema({
    $id: 'feedback',
    properties: {
      category: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['feature', 'ui', 'ux', 'enhancement', 'bug'],
        },
      },
      feedbackId: { type: 'string', format: 'uuid' },
      status: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['suggestion', 'planned', 'in-progress', 'live'],
        },
      },
    },

    body: {
      create: {
        type: 'object',
        required: ['category', 'description', 'title'],
        properties: {
          category: { $ref: 'feedback#/properties/category/items' },
          description: { type: 'string', maxLength: 300 },
          status: { $ref: 'feedback#/properties/status/items' },
          title: { type: 'string', minLength: 5, maxLength: 75 },
        },
      },
    },

    response: {
      type: 'object',
      properties: {
        category: { type: 'string' },
        commentCount: { type: 'number' },
        description: { type: 'string' },
        hasVoted: { type: 'boolean' },
        id: { type: 'string' },
        slug: { type: 'string' },
        status: { type: 'string' },
        title: { type: 'string' },
        userId: { type: 'string' },
        votes: { type: 'number' },
      },
    },
  });
});

export const listFeedbackSchema: FastifySchema = {
  querystring: {
    properties: {
      category: { $ref: 'feedback#/properties/category' },
      sort: {
        type: 'string',
        enum: ['votes', 'comment_count'],
      },
      status: { $ref: 'feedback#/properties/status' },
      order: {
        type: 'string',
        enum: ['asc', 'desc'],
      },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      type: 'array',
      items: { $ref: 'feedback#/response' },
    },
  },
};

export const feedbackDetailSchema: FastifySchema = {
  response: {
    [status.HTTP_200_OK]: { $ref: 'feedback#/response' },
  },
};

export const createFeedbackSchema: FastifySchema = {
  body: { $ref: 'feedback#/body/create' },
};

export const editFeedbackSchema: FastifySchema = {
  body: { $ref: 'feedback#/body/create' },
  params: {
    type: 'object',
    required: ['feedbackId'],
    properties: {
      feedbackId: { $ref: 'feedback#/properties/feedbackId' },
    },
  },
};

export const deleteFeedbackSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['feedbackId'],
    properties: {
      feedbackId: { $ref: 'feedback#/properties/feedbackId' },
    },
  },
};

export const roadmapCountSchema: FastifySchema = {
  response: {
    [status.HTTP_200_OK]: {
      type: 'object',
      properties: {
        inProgress: { type: 'number' },
        live: { type: 'number' },
        planned: { type: 'number' },
      },
    },
  },
};

export const roadmapSchema: FastifySchema = {
  response: {
    [status.HTTP_200_OK]: {
      type: 'array',
      items: { $ref: 'feedback#/response' },
    },
  },
};
