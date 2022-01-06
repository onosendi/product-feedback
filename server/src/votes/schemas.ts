import type { FastifySchema } from 'fastify';

const createAndDeletaParamsSchema = {
  params: {
    type: 'object',
    required: ['feedbackId'],
    properties: {
      feedbackId: {
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
