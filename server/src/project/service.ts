import type { FastifyInstance } from 'fastify';

export default class BaseService {
  protected fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }
}
