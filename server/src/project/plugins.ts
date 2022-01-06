import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import status from '../lib/httpStatusCodes';

export const needsOwner: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate(
    'needsOwner',
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { id: userId, role } = request.authUser;
      const { detail } = request;

      if (!detail) {
        throw new Error('No detail object found on Request');
      }

      if (userId !== detail?.userId && role !== 'admin') {
        const error = new Error('Not the owner');
        reply
          .status(status.HTTP_403_FORBIDDEN)
          .send(error);
      }
    },
  );
});

export const requestDetail: FastifyPluginAsync = fp(async (fastify) => {
  // TODO: This abstraction doesn't work in a lot of places. Figure
  // something else out.
  fastify.decorateRequest('detail', null);

  fastify.decorate(
    'decorateRequestDetail',
    function (obj: {
      paramKey: string,
      select?: string[],
      table: string,
      tableColumn?: string,
    }) {
      return async (
        request: FastifyRequest<{ Params: Record<string, string> }>,
        reply: FastifyReply,
      ) => {
        const {
          paramKey,
          select = [],
          table,
          tableColumn = 'id',
        } = obj;
        const newParamKey = paramKey || Object.keys(request.params)[0];

        const paramValue = request.params[newParamKey];

        const query = fastify
          .knex(table)
          .where({ [tableColumn]: paramValue })
          .first();

        if (select.length) {
          query.select(select);
        }

        const detail = await query;

        if (!detail) {
          const error = new Error('Record does not exist');
          reply
            .status(status.HTTP_400_BAD_REQUEST)
            .send(error);
        }

        request.detail = detail;
      };
    },
  );
});
