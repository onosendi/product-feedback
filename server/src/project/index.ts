import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import errorHandler from './errors';
import {
  appPlugins,
  fastifyCors,
  fastifyEnv,
  fastifyJwt,
  fastifyKnex,
} from './plugins';

const project: FastifyPluginAsync = fp(async (fastify) => {
  // Third-party Plugins
  await fastify.register(fastifyEnv);
  fastify.register(fastifyCors);
  fastify.register(fastifyJwt);
  fastify.register(fastifyKnex);

  // App Plugins
  fastify.register(appPlugins);

  // Errors
  fastify.setErrorHandler(errorHandler);
});

export default project;
