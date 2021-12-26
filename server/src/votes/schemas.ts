import type { FastifySchema } from 'fastify';
import status from '../lib/httpStatusCodes';

export const createVoteSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      type: 'object',
      properties: {
        suggestionId: {
          type: 'string',
          format: 'uuid',
        },
      },
    },
  },
};

export const deleteVoteSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      type: 'object',
      properties: {
        suggestionId: {
          type: 'string',
          format: 'uuid',
        },
      },
    },
  },
};
