import type { DBUser } from '@t/database';
import 'fastify';
import type { Knex } from 'knex';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => void;
    knex: Knex;
    statusNeedsAdmin: (request: FastifyRequest, reply: FastifyReply) => void;
    validateDetailId: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => void;
  }

  interface FastifyRequest {
    authUser: DBUser;
  }
}
