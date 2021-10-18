import { FastifyPluginCallback } from 'fastify';
import { postTokenSchema } from './schemas';
import { PostToken } from './types';

const authRoutes: FastifyPluginCallback = (fastify, opts, next) => {
  fastify.post<PostToken>('/token', { schema: postTokenSchema }, async (req) => {
    const { username, password = '' } = req.body;
    console.log(username, password);
    return { foo: 'bar' };
  });

  next();
};

export default authRoutes;
