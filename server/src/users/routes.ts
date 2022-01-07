import type { APIRegister } from '@t/api';
import type { AuthResponse } from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import { createPassword } from '../lib/passwordHasher';
import { RECORD_NOT_FOUND, USERNAME_ALREADY_EXISTS } from '../project/errors';
import { services } from './plugins';
import { registerSchema, userDetailSchema } from './schemas';

const usersRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(services);

  // Create user.
  fastify.route<{ Body: APIRegister }>({
    method: 'POST',
    url: '/',
    schema: registerSchema,
    handler: async (request, reply) => {
      const { username, password } = request.body;

      const user = await fastify.getUser({ username });
      if (user) {
        throw new Error(USERNAME_ALREADY_EXISTS);
      }

      const userId = uuidv4();
      const passwordHash = createPassword(password);
      const [role] = await fastify.createUser({
        userId,
        username,
        password: passwordHash,
      }).returning('role');

      await fastify.updateLastLogin(userId);

      const token = fastify.jwt.sign({ userId });
      const response: AuthResponse = {
        role,
        token,
        userId,
        username,
      };

      reply.status(status.HTTP_201_CREATED).send(response);
    },
  });

  fastify.route<{
    Params: { username: string },
  }>({
    method: 'GET',
    // TODO: better url
    url: '/validate/:username',
    schema: userDetailSchema,
    handler: async (request, reply) => {
      const { username } = request.params;
      const user = await fastify.getUser({ username });
      if (!user) {
        throw new Error(RECORD_NOT_FOUND);
      }
      reply.status(status.HTTP_200_OK).send(true);
    },
  });
};

export default usersRoutes;
