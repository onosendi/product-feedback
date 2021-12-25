// TODO look into UUID format for strings: https://ajv.js.org/json-schema.html#keywords-for-strings
import type { FastifySchema } from 'fastify';

export const createVoteSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
};

export const deleteVoteSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
};
