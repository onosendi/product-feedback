import { FastifyPlugin } from 'fastify';
import { listSuggestions } from './schemas';
import status from '../lib/httpStatusCodes';

const suggestionRoutes: FastifyPlugin = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: listSuggestions,
    handler: async (request, reply) => {
      reply
        .status(status.HTTP_200_OK)
        .send({});
    },
  });

  done();
};

export default suggestionRoutes;
