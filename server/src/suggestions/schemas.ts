import type { FastifySchema } from 'fastify';
import status from '../lib/httpStatusCodes';

export const listSuggestions: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      category: { type: 'string', nullable: true },
      order: { type: 'string', nullable: true },
      sort: { type: 'string', nullable: true },
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
