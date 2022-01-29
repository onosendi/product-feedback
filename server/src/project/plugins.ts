import camelCaseKeys from 'camelcase-keys';
import type { FastifyPluginAsync } from 'fastify';
import FastifyCors from 'fastify-cors';
import FastifyEnv from 'fastify-env';
import FastifyJwt from 'fastify-jwt';
import FastifyKnex from 'fastify-knexjs';
import fp from 'fastify-plugin';
import S from 'fluent-json-schema';
import type { Knex } from 'knex';
import path from 'path';
import CommentService from '../comments/service';
import FeedbackService from '../feedback/service';
import UserService from '../users/service';
import VoteService from '../votes/service';
import { RECORD_NOT_FOUND } from './errors';

declare module 'fastify' {
  interface FastifyInstance {
    getQueryOr404: (query: Knex.QueryBuilder) => any;
    commentService: CommentService;
    feedbackService: FeedbackService;
    userService: UserService;
    voteService: VoteService;
  }
}
export const appPlugins: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('commentService', new CommentService(fastify));
  fastify.decorate('feedbackService', new FeedbackService(fastify));
  fastify.decorate('userService', new UserService(fastify));
  fastify.decorate('voteService', new VoteService(fastify));

  fastify.decorate(
    'getQueryOr404',
    async function (query: Knex.QueryBuilder) {
      const qry = await query;
      if (!qry) {
        throw new Error(RECORD_NOT_FOUND);
      }
      return qry;
    },
  );
});

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      APP_HOST: string,
      APP_PORT: number,
      APP_SECRET: string,
      DB_NAME: string,
      DB_USER: string,
      DB_PASSWORD: string,
      DB_DEBUG: boolean,
      NODE_ENV: 'development' | 'production' | 'testing',
    };
  }
}
export const fastifyEnv: FastifyPluginAsync = fp(async (fastify) => {
  const envFilename = process.env.NODE_ENV === 'testing'
    ? '.env.testing'
    : '.env';

  await fastify.register(FastifyEnv, {
    dotenv: {
      path: path.resolve(__dirname, `../../${envFilename}`),
    },
    schema: S.object()
      .prop('APP_HOST', S.string().default('localhost'))
      .prop('APP_PORT', S.number().required())
      .prop('APP_SECRET', S.string().required())
      .prop('DB_NAME', S.string().required())
      .prop('DB_USER', S.string().required())
      .prop('DB_PASSWORD', S.string().required())
      .prop('DB_DEBUG', S.boolean().required())
      .prop('NODE_ENV', S.string().required())
      .valueOf(),
  });
});

export const fastifyCors: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(FastifyCors, {
    origin: [
      'http://localhost:3000',
      'https://product-feedback.dlindegren.com',
    ],
  });
});

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: { userId: string };
  }
}
export const fastifyJwt: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(FastifyJwt, {
    secret: fastify.config.APP_SECRET,
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex;
    knexConfig: Knex.Config;
  }
}
export const fastifyKnex: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.decorate('knexConfig', {
    client: 'pg',
    connection: {
      database: fastify.config.DB_NAME,
      password: fastify.config.DB_PASSWORD,
      user: fastify.config.DB_USER,
    },
    migrations: {
      directory: path.resolve(__dirname, '../../database/migrations'),
    },
    postProcessResponse: (response: Knex) => camelCaseKeys(response, { deep: true }),
    seeds: {
      directory: path.resolve(__dirname, '../../database/seeds'),
    },
    debug: fastify.config.DB_DEBUG,
  });

  fastify.register(FastifyKnex, fastify.knexConfig);
});
