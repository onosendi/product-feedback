import type { DBSuggestion, DBUser } from '@t/database';
import type { Knex } from 'knex';

declare module 'fastify' {
  interface FastifyInstance {
    needsOwner: (request: FastifyRequest, reply: FastifyReply) => void;
    knex: Knex;
    needsAuthentication: (request: FastifyRequest, reply: FastifyReply) => void;
    needsAdminToModifyStatus: (request: FastifyRequest, reply: FastifyReply) => void;
  }

  interface FastifyRequest {
    authUser: DBUser;
    detail: DBSuggestion | null;
  }
}
