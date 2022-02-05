import type { DBFeedbackStatus } from '@t/database';
import type {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import fp from 'fastify-plugin';
import { INSUFFICIENT_PRIVILEGES } from '../project/errors';

declare module 'fastify' {
  interface FastifyInstance {
    needsAdminToModifyStatus: (
      request: FastifyRequest,
      reply: FastifyReply,
      done: HookHandlerDoneFunction,
    ) => void;
  }
}

export const needsAdminToModifyStatus: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate(
    'needsAdminToModifyStatus',
    function (
      request: FastifyRequest<{
        Body: { status: DBFeedbackStatus },
      }>,
      reply: FastifyReply,
      done: HookHandlerDoneFunction,
    ) {
      const { role } = request.authUser;
      const { status } = request.body;
      if (
        status
        && status !== 'suggestion'
        && role !== 'admin'
      ) {
        done(new Error(INSUFFICIENT_PRIVILEGES));
      }
      done();
    },
  );
});
