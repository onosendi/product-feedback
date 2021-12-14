import { FastifyPlugin } from 'fastify';
import status from '../lib/httpStatusCodes';
import { checkPassword } from '../lib/passwordHasher';
import { tokenSchema } from './schemas';

const authRoutes: FastifyPlugin = (fastify, opts, done) => {
  // Authenticate
  fastify.route<{
    Body: { username: string, password: string },
  }>({
    method: 'POST',
    url: '/login',
    schema: tokenSchema,
    handler: async (request, reply) => {
      const { username, password } = request.body;

      const user = await fastify
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
      reply
        .status(status.HTTP_200_OK)
        .send({
          role: user.role,
          token,
          username,
        });
    },
  });

  done();
};

export default authRoutes;
