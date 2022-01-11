import type { FastifyPluginAsync, FastifySchema } from 'fastify';
import fp from 'fastify-plugin';

export const schema: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addSchema({
    $id: 'votes',
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
  });
});

export const createVoteSchema: FastifySchema = {
  params: {
    $ref: 'votes#/params',
  },
};

export const deleteVoteSchema: FastifySchema = {
  params: {
    $ref: 'votes#/params',
  },
};
