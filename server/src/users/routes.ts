import type { APIRegister } from '@t/api';
import type { AuthResponse } from '@t/response';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import { createPassword } from '../lib/passwordHasher';
import { updateLastLogin } from './queries';
import { registerSchema, userDetailSchema } from './schemas';

const usersRoutes: FastifyPluginAsync = async (fastify) => {
  // Create user.
  fastify.route<{ Body: APIRegister }>({
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

      await updateLastLogin(fastify.knex, userId);

      const token = fastify.jwt.sign({ userId });
      const response: AuthResponse = {
        role,
        token,
        userId,
        username,
      };
      reply
        .status(status.HTTP_201_CREATED)
        .send(response);
    },
  });

  // User detail.
  fastify.route<{
    Params: { username: string },
  }>({
    method: 'GET',
    url: '/validate/:username',
    schema: userDetailSchema,
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'user',
        tableColumn: 'username',
      }),
    ],
    handler: (request, reply) => {
      reply
        .status(status.HTTP_200_OK)
        .send(true);
    },
  });
};

export default usersRoutes;
