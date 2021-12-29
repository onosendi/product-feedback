import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import status from '../lib/httpStatusCodes';

export function decorateRequestWithDetail(
  fastify: FastifyInstance,
  obj: {
    paramKey: string;
    select?: string[];
    table: string;
    tableColumn?: string;
  },
) {
  return async (
    request: FastifyRequest<{
      Params: {
        [key in string]: string;
      },
    }>,
    reply: FastifyReply,
  ) => {
    const {
      paramKey,
      select = [],
      table,
      tableColumn = 'id',
    } = obj;
    const paramValue = request.params[paramKey];

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
}
