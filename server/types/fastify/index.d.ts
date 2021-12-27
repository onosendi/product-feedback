import type { DBUser } from '@t/database';
import 'fastify';
import type { Knex } from 'knex';

declare module 'fastify' {
  interface FastifyInstance {
    needsAuthentication: (request: FastifyRequest, reply: FastifyReply) => void;
    knex: Knex;
  }

  interface FastifyRequest {
    authUser: DBUser;
  }
}
