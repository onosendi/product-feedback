import type { FastifyPluginAsync } from 'fastify';
import auth from './auth';
import comments from './comments';
import feedback from './feedback';
import project from './project';
import users from './users';
import votes from './votes';

const app: FastifyPluginAsync = async (fastify) => {
  fastify.register(project);
  fastify.register(auth);
  fastify.register(users);
  fastify.register(feedback);
  fastify.register(votes);
  fastify.register(comments);
};

export default app;
