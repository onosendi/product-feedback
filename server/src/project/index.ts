import type { FastifyPluginAsync } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyJwt from 'fastify-jwt';
import fastifyKnex from 'fastify-knexjs';
import fp from 'fastify-plugin';
import type { Knex } from 'knex';
import errorHandler from './errors';
import getKnexConfig from './knexConfig';
import plugins from './plugins';

declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex;
  }
}

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: { userId: string };
  }
}

const project: FastifyPluginAsync = fp(async (fastify) => {
  // Third party
  fastify.register(fastifyCors, {
    origin: [
      'http://localhost:3000',
      'https://product-feedback.dlindegren.com',
    ],
  });

  fastify.register(fastifyJwt, {
    secret: process.env.APP_SECRET as string,
  });

  fastify.register(fastifyKnex, getKnexConfig());

  // Plugins
  fastify.register(plugins);

  // Errors
  fastify.setErrorHandler(errorHandler);
});

export default project;
