import type { APILogin } from '@t/api';
import type { DBUser } from '@t/database';
import type { AuthResponse } from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import status from '../project/http-status-codes';
import { checkPassword } from '../project/password-hasher';
import { INVALID_USERNAME_OR_PASSWORD } from '../project/errors';
import { loginSchema } from './schemas';

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Authenticate
  fastify.route<{ Body: APILogin }>({
    method: 'POST',
    url: '/login',
    schema: loginSchema,
    handler: async (request, reply) => {
      const { username, password } = request.body;

      const user: Pick<
      DBUser,
      'id' | 'password' | 'role' | 'emailHash'
      > = await fastify.userService.getUser({ username }).select('password');

      if (!checkPassword(password, user?.password)) {
        throw new Error(INVALID_USERNAME_OR_PASSWORD);
      }

      await fastify.userService.updateLastLogin(user.id);

      const token = fastify.jwt.sign({ userId: user.id });
      const response: AuthResponse = {
        role: user.role,
        token,
        userId: user.id,
        username,
        emailHash: user.emailHash,
      };

      reply.status(status.HTTP_200_OK).send(response);
    },
  });
};

export default authRoutes;
