import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { knexDecorator } from './plugins';

const project: FastifyPluginAsync = async (fastify) => {
  // Plugins
  fastify.register(knexDecorator);
};

export default fp(project);
