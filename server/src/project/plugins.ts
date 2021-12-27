import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import KnexInstance from '../lib/knex';

export const knex: FastifyPluginAsync = fp(async (fastify) => {
  if (!fastify.knex) {
    fastify.decorate('knex', KnexInstance);
  }
});

export const requestDetail: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorateRequest('detail', null);
});
