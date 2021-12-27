import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { knex, needsOwner, requestDetail } from './plugins';

const project: FastifyPluginAsync = fp(async (fastify) => {
  // Plugins
  fastify.register(knex);
  fastify.register(requestDetail);
  fastify.register(needsOwner);
});

export default project;
