import type { DBId, DBUser, DBUserRole } from '@t/database';
import BaseService from '../project/service';

export default class UserService extends BaseService {
  getUser(where: Partial<DBUser>) {
    return this
      .fastify
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
  }

  createUser(obj: {
    userId: DBId,
    username: string,
    password: string,
    emailHash: string,
    role?: DBUserRole,
  }) {
    const role = obj.role || 'user';
    return this
      .fastify
      .knex('user')
      .insert({
        id: obj.userId,
        username: obj.username,
        password: obj.password,
        email_hash: obj.emailHash,
        role,
      });
  }

  updateLastLogin(userId: DBId) {
    return this
      .fastify
      .knex('user')
      .where({ id: userId })
      .update({ last_login: new Date() });
  }

  editUser(
    userId: DBId,
    obj: {
      email: string | null,
      emailHash: string,
      firstName: string | null,
      lastName: string | null,
      password: string | undefined,
      username: string,
    },
  ) {
    return this
      .fastify
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
  }
}
