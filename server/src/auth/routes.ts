import type { DBUser } from '@t/database';
import type { AuthResponse } from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import status from '../lib/httpStatusCodes';
import { checkPassword } from '../lib/passwordHasher';
import { loginSchema } from './schemas';

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Authenticate
  fastify.route<{
    Body: {
      username: string;
      password: string;
    },
  }>({
    method: 'POST',
    url: '/login',
    schema: loginSchema,
    handler: async (request, reply) => {
      const { username, password } = request.body;

      const user: DBUser = await fastify
        .knex('user')
        .select('id', 'password', 'role')
        .where({ username })
        .first();

      if (!checkPassword(password, user?.password)) {
        const error = new Error('Invalid username or password');
        reply.status(status.HTTP_401_UNAUTHORIZED).send(error);
        return;
      }

      await fastify
        .knex('user')
        .where({ id: user.id })
        .update({ last_login: new Date() });

      const token = fastify.jwt.sign({ userId: user.id });
      const response: AuthResponse = {
        role: user.role,
        token,
        userId: user.id,
        username,
      };
      reply
        .status(status.HTTP_200_OK)
        .send(response);
    },
  });
};

export default authRoutes;
