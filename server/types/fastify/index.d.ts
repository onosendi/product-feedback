import 'fastify';
import { Knex } from 'knex';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => void;
    knex: Knex;
  }
}
