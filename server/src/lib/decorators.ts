import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import knex from './knex';

const knexDecorator: FastifyPlugin = (fastify, opts, done) => {
  if (!fastify.knex) {
    fastify.decorate('knex', knex);
  }

  done();
};

export default fp(knexDecorator);
