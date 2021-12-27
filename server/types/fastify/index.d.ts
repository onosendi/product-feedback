import type { DBSuggestion, DBUser } from '@t/database';
import 'fastify';
import type { Knex } from 'knex';

declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex;
    needsAuthentication: (request: FastifyRequest, reply: FastifyReply) => void;
    needsToBeOwner: (request: FastifyRequest, reply: FastifyReply) => void;
    statusNeedsAdmin: (request: FastifyRequest, reply: FastifyReply) => void;
  }

  interface FastifyRequest {
    authUser: DBUser;
    detail: DBSuggestion | null;
  }
}
