import type { FastifySchema } from 'fastify';
import status from '../lib/httpStatusCodes';

export const listSuggestionsSchema: FastifySchema = {
  querystring: {
    properties: {
      category: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          category: { type: 'string' },
          commentCount: { type: 'number' },
          description: { type: 'string' },
          hasVoted: { type: 'boolean' },
          id: { type: 'string' },
          slug: { type: 'string' },
          title: { type: 'string' },
          userId: { type: 'string' },
          votes: { type: 'number' },
        },
      },
    },
  },
};

export const suggestionDetailSchema: FastifySchema = {
  response: {
    [status.HTTP_200_OK]: {
      type: 'object',
      properties: {
        category: { type: 'string' },
        commentCount: { type: 'number' },
        description: { type: 'string' },
        hasVoted: { type: 'boolean' },
        id: { type: 'string' },
        slug: { type: 'string' },
        title: { type: 'string' },
        userId: { type: 'string' },
        votes: { type: 'number' },
      },
    },
  },
};

const createAndEditBodySchema = {
  body: {
    type: 'object',
    required: [
      'category',
      'description',
      'title',
    ],
    properties: {
      category: {
        type: 'string',
        enum: [
          'feature',
          'ui',
          'ux',
          'enhancement',
          'bug',
        ],
      },
      description: {
        type: 'string',
        maxLength: 300,
      },
      status: {
        type: 'string',
        enum: [
          'suggestion',
          'planned',
          'in-progress',
          'live',
        ],
      },
      title: {
        type: 'string',
        minLength: 5,
        maxLength: 75,
      },
    },
  },
};

export const createSuggestionSchema: FastifySchema = {
  ...createAndEditBodySchema,
};

export const editSuggestionSchema: FastifySchema = {
  ...createAndEditBodySchema,
  params: {
    type: 'object',
    required: ['suggestionId'],
    properties: {
      suggestionId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
};

// TODO
export const deleteSuggestionSchema: FastifySchema = {};

export const roadmapCountSchema: FastifySchema = {};
