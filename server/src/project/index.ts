import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { requestDetail, knex } from './plugins';

const project: FastifyPluginAsync = async (fastify) => {
  // Plugins
  fastify.register(knex);
  fastify.register(requestDetail);
};

export default fp(project);
