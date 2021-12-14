import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';

const user: FastifyPlugin = (fastify, opts, done) => {
  // Routes
  fastify.register(routes, { prefix: '/user' });

  done();
};

export default fp(user);
