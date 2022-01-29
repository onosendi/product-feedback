import type { FastifyServerOptions } from 'fastify';

const options: FastifyServerOptions = {
  ajv: {
    customOptions: {
      $data: true,
      allErrors: true,
      coerceTypes: 'array',
      removeAdditional: 'all',
    },
  },
  logger: process.env.NODE_ENV === 'development',
};

export default options;
