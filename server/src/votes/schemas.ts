import type { FastifySchema } from 'fastify';

const createAndDeletaParamsSchema = {
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

export const createVoteSchema: FastifySchema = {
  ...createAndDeletaParamsSchema,
};

export const deleteVoteSchema: FastifySchema = {
  ...createAndDeletaParamsSchema,
};
