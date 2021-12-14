import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import knex from '../lib/knex';

const knexDecoratorFunc: FastifyPluginCallback = (fastify, opts, done) => {
  if (!fastify.knex) {
    fastify.decorate('knex', knex);
  }

  done();
};
export const knexDecorator = fp(knexDecoratorFunc);
