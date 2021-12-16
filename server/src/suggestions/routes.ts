import { FastifyPlugin } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import { getSuggestions } from './queries';
import { listSuggestions } from './schemas';

const suggestionRoutes: FastifyPlugin = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: listSuggestions,
    handler: async (request, reply) => {
      const { user } = request;

      const userId = uuidv4();

      const suggestions = await getSuggestions(fastify.knex, userId);

      reply
        .status(status.HTTP_200_OK)
        .send(suggestions);
    },
  });

  done();
};

export default suggestionRoutes;
