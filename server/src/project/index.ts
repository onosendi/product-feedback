import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { needsOwner, requestDetail } from './plugins';

const project: FastifyPluginAsync = fp(async (fastify) => {
  // Plugins
  fastify.register(requestDetail);
  fastify.register(needsOwner);
});

export default project;
