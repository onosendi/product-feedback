import type { FastifySchema } from 'fastify';
import status from '../lib/httpStatusCodes';

export const listSuggestionsSchema: FastifySchema = {
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

export const createSuggestionSchema: FastifySchema = {
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
