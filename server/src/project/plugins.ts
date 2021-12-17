import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import knex from '../lib/knex';

const knexDecoratorFunc: FastifyPluginAsync = async (fastify) => {
  if (!fastify.knex) {
    fastify.decorate('knex', knex);
  }
};
export const knexDecorator = fp(knexDecoratorFunc);
