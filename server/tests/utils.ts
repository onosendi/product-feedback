import type {
  DBCategoryCategory,
  DBCategoryDisplay,
  DBFeedbackStatus,
  DBId,
  DBUser,
  DBUserRole,
} from '@t/database';
import type { AuthResponse } from '@t/response';
import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import fp from 'fastify-plugin';
import type tap from 'tap';
import { v4 as uuidv4 } from 'uuid';
import app from '../src/app';
import type { CreateFeedbackObj } from '../src/feedback/service';
import makeSlug from '../src/project/make-slug';
import { createPassword } from '../src/project/password-hasher';
import options from '../src/server-options';

export type Test = typeof tap['Test']['prototype'];

export async function build(t: Test) {
  const fastify = Fastify(options);

  fastify.register(fp(app));

  await fastify.ready();

  t.teardown(() => {
    fastify.close();
  });

  return fastify;
}

type LoginReturn = {
  auth: AuthResponse,
  user: DBUser,
};
export async function login(
  fastify: FastifyInstance,
  username: string = 'testing',
  role: DBUserRole = 'user',
): Promise<LoginReturn> {
  const user = await fastify.userService.getUser({ username });
  const password = 'testing';
  if (!user) {
    await fastify.userService.createUser({
      userId: uuidv4(),
      username,
      password: createPassword(password),
      emailHash: '',
      role,
    });
  }
  const token = fastify.jwt.sign({ userId: user.id });

  return {
    auth: {
      role: user.role,
      token,
      userId: user.id,
      username,
      emailHash: user.emailHash,
    },
    user,
  };
}

type CreateFeedback = (
  fastify: FastifyInstance,
  user: DBUser,
  args?: Partial<CreateFeedbackObj>,
  category?: DBCategoryCategory,
) => Promise<{
  category: DBCategoryDisplay,
  commentCount: number,
  description: string,
  hasVoted: boolean,
  id: DBId,
  slug: string,
  status: DBFeedbackStatus,
  title: string,
  userId: DBId,
  votes: number,
}>;
export const createFeedback: CreateFeedback = async (
  fastify,
  user,
  args = {},
  category = 'ui',
) => {
  const { id: categoryId } = await fastify.feedbackService.getCategory(category);

  const fields: CreateFeedbackObj = {
    categoryId,
    description: 'testing',
    feedbackId: uuidv4(),
    slug: makeSlug('testing'),
    status: 'suggestion',
    title: 'testing',
    userId: user.id,
    ...args,
  };

  await fastify.feedbackService.createFeedback(fields);

  const feedback = fastify.feedbackService.getFeedbackDetail({
    slug: fields.slug,
    userId: user.id,
  });

  return feedback;
};
