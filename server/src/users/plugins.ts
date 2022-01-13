import type { DBId, DBUser } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import type { Knex } from 'knex';

type GetUserWhere = Partial<DBUser>;

type CreateUserObj = {
  userId: DBId,
  username: string,
  password: string,
};

type EditUserObj = {
  email: string | null,
  emailHash: string,
  firstName: string | null,
  lastName: string | null,
  password: string | undefined,
  username: string,
};

declare module 'fastify' {
  interface FastifyInstance {
    getUser: (where: GetUserWhere) => Knex.QueryBuilder;
    createUser: (obj: CreateUserObj) => Knex.QueryBuilder;
    updateLastLogin: (userId: DBId) => Knex.QueryBuilder;
    editUser: (userId: DBId, obj: EditUserObj) => Knex.QueryBuilder;
  }
}

export const services: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('getUser', function (where: GetUserWhere) {
    return fastify
      .knex('user')
      .select(
        'created_at',
        'email',
        'email_hash',
        'first_name',
        'id',
        'last_login',
        'last_name',
        'role',
        'username',
      )
      .where(where)
      .first();
  });

  fastify.decorate('createUser', function (obj: CreateUserObj) {
    return fastify
      .knex('user')
      .insert({
        id: obj.userId,
        username: obj.username,
        password: obj.password,
      });
  });

  fastify.decorate('updateLastLogin', function (userId: DBId) {
    return fastify
      .knex('user')
      .where({ id: userId })
      .update({ last_login: new Date() });
  });

  fastify.decorate('editUser', function (userId: DBId, obj: EditUserObj) {
    return fastify
      .knex('user')
      .update({
        email: obj.email,
        email_hash: obj.emailHash,
        first_name: obj.firstName,
        last_name: obj.lastName,
        password: obj.password,
        username: obj.username,
      })
      .where({ id: userId });
  });
});
