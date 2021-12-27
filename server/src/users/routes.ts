import type { AuthResponse } from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import { createPassword } from '../lib/passwordHasher';
import { registerSchema } from './schemas';

const usersRoutes: FastifyPluginAsync = async (fastify) => {
  // Create user.
  fastify.route<{
    Body: {
      username: string;
      password: string;
      passwordConfirm: string;
    },
  }>({
    method: 'POST',
    url: '/',
    schema: registerSchema,
    handler: async (request, reply) => {
      const { username, password } = request.body;

      const user = await fastify
        .knex('user')
        .select('id', 'role')
        .where({ username })
        .first();
      if (user) {
        const error = new Error('Username already exists');
        reply.status(status.HTTP_400_BAD_REQUEST).send(error);
        return;
      }

      const userId = uuidv4();
      const passwordHash = createPassword(password);
      const [role] = await fastify
        .knex('user')
        .insert({
          id: userId,
          username,
          password: passwordHash,
        })
        .returning('role');

      await fastify
        .knex('user')
        .where({ id: userId })
        .update({ last_login: new Date() });

      const token = fastify.jwt.sign({ userId });
      const response: AuthResponse = {
        role,
        token,
        username,
      };
      reply
        .status(status.HTTP_201_CREATED)
        .send(response);
    },
  });

  // // Verify user exists
  // fastify.route<{
  //   Params: { username: string },
  // }>({
  //   method: 'GET',
  //   url: '/:username',
  //   handler: async (request, reply) => {
  //     const { username } = request.params;

  //     const user = await fastify.knex('user').where({ username }).first();
  //     if (user) {
  //       reply.status(status.HTTP_200_OK).send(status.HTTP_200_OK);
  //       return;
  //     }

  //     reply.status(status.HTTP_404_NOT_FOUND).send(status.HTTP_404_NOT_FOUND);
  //   },
  // });

  // Test
  fastify.route({
    method: 'GET',
    url: '/test',
    preValidation: [fastify.needsAuthentication],
    handler: async (request, reply) => {
      const { authUser } = request;
      reply
        .status(status.HTTP_200_OK)
        .send(authUser);
    },
  });
};

export default usersRoutes;
