import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { needsOwner } from './plugins';

const project: FastifyPluginAsync = fp(async (fastify) => {
  // Plugins
  fastify.register(needsOwner);
});

export default project;
