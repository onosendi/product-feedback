import type { DBId, DBUser } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import type { Knex } from 'knex';

declare module 'fastify' {
  interface FastifyInstance {
    getUser: (where: Partial<DBUser>) => Knex.QueryBuilder;
    createUser: (
      obj: {
        userId: DBId,
        username: string,
        password: string,
      },
    ) => Knex.QueryBuilder;
    updateLastLogin: (userId: DBId) => Knex.QueryBuilder;
  }
}

export const services: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('getUser', function (where: any) {
    return fastify
      .knex('user')
      .select(
        'created_at',
        'first_name',
        'id',
        'last_login',
        'last_name',
        'picture',
        'role',
        'username',
      )
      .where(where)
      .first();
  });

  fastify.decorate('createUser', function (obj: any) {
    return fastify
      .knex('user')
      .insert({
        id: obj.userId,
        username: obj.username,
        password: obj.password,
      });
  });

  fastify.decorate('updateLastLogin', function (userId: any) {
    return fastify
      .knex('user')
      .where({ id: userId })
      .update({ last_login: new Date() });
  });
});
