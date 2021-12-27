import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { decorateRequestDetail, knexDecorator } from './plugins';

const project: FastifyPluginAsync = async (fastify) => {
  // Plugins
  fastify.register(knexDecorator);
  fastify.register(decorateRequestDetail);
};

export default fp(project);
