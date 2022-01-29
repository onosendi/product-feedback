import type { APIEditUser, APIRegister } from '@t/api';
import type { DBUser } from '@t/database';
import type { AuthResponse } from '@t/response';
import { MD5 } from 'crypto-js';
import type { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { INVALID_PASSWORD, USERNAME_ALREADY_EXISTS } from '../project/errors';
import status from '../project/http-status-codes';
import { checkPassword, createPassword } from '../project/password-hasher';
import { createUserSchema, editUserSchema, userDetailSchema } from './schemas';

const usersRoutes: FastifyPluginAsync = async (fastify) => {
  // Create user.
  fastify.route<{ Body: APIRegister }>({
    method: 'POST',
    url: '/',
    schema: createUserSchema,
    handler: async (request, reply) => {
      const { username, password } = request.body;

      const user = await fastify.userService.getUser({ username });
      if (user) {
        throw new Error(USERNAME_ALREADY_EXISTS);
      }

      const userId = uuidv4();
      const passwordHash = createPassword(password);
      const emailHash = MD5('').toString();
      const [role] = await fastify.userService.createUser({
        userId,
        username,
        password: passwordHash,
        emailHash,
      }).returning('role');

      await fastify.userService.updateLastLogin(userId);

      const token = fastify.jwt.sign({ userId });
      const response: AuthResponse = {
        role,
        token,
        userId,
        username,
        emailHash,
      };

      reply.status(status.HTTP_201_CREATED).send(response);
    },
  });

  fastify.route<{ Params: { username: string } }>({
    method: 'GET',
    url: '/:username',
    schema: userDetailSchema,
    handler: async (request, reply) => {
      const { username } = request.params;
      const user = await fastify.getQueryOr404(
        fastify.userService.getUser({ username }),
      );
      if (request.authUser.username === username) {
        reply.status(status.HTTP_200_OK).send(user);
        return;
      }
      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });

  fastify.route<{ Body: APIEditUser }>({
    method: 'PATCH',
    url: '/',
    schema: editUserSchema,
    preValidation: [fastify.needsAuthentication],
    handler: async (request, reply) => {
      const { id: userId, username } = request.authUser;
      const {
        currentPassword,
        email = null,
        firstName = null,
        lastName = null,
        password,
        passwordConfirm,
        username: newUsername,
      } = request.body;

      const updateObj = {
        email,
        emailHash: MD5(email || '').toString(),
        firstName,
        lastName,
        password,
        username: newUsername,
      };

      if (newUsername && newUsername !== username) {
        const user = await fastify.userService.getUser({ username: newUsername });
        if (user) {
          throw new Error(USERNAME_ALREADY_EXISTS);
        }
      }

      if (currentPassword && password && passwordConfirm) {
        const user: Pick<DBUser, 'password'> = await fastify
          .userService
          .getUser({ id: userId })
          .select('password');
        if (!checkPassword(currentPassword, user.password)) {
          throw new Error(INVALID_PASSWORD);
        }
        updateObj.password = createPassword(password);
      }

      await fastify.userService.editUser(userId, updateObj);

      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });
};

export default usersRoutes;
