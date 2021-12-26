import type { FastifySchema } from 'fastify';

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
};
