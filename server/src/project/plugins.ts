import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import type { Knex } from 'knex';
import { RECORD_NOT_FOUND } from './errors';

declare module 'fastify' {
  interface FastifyInstance {
    getQueryOr404: (query: Knex.QueryBuilder) => any;
  }
}

const plugins: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate(
    'getQueryOr404',
    async function (query: Knex.QueryBuilder) {
      const qry = await query;
      if (!qry) {
        throw new Error(RECORD_NOT_FOUND);
      }
      return qry;
    },
  );
});

export default plugins;
