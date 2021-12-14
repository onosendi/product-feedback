import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import { knexDecorator } from './plugins';

const project: FastifyPlugin = (fastify, opts, done) => {
  // Plugins
  fastify.register(knexDecorator);

  done();
};

export default fp(project);
