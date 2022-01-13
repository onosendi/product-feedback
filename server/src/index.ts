import dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import fastify from 'fastify';
import auth from './auth';
import comments from './comments';
import feedback from './feedback';
import project from './project';
import users from './users';
import votes from './votes';

dotenv.config();

const app: FastifyInstance = fastify({
  ajv: {
    customOptions: {
      $data: true,
      allErrors: true,
      coerceTypes: 'array',
      removeAdditional: 'all',
    },
  },
  logger: process.env.NODE_ENV === 'development',
});

app.register(project);
app.register(auth);
app.register(users);
app.register(feedback);
app.register(votes);
app.register(comments);

async function start() {
  try {
    await app.listen({
      host: process.env.APP_HOST as string || 'localhost',
      port: Number(process.env.APP_PORT) || 8000,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
