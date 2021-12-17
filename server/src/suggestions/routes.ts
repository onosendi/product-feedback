import { FastifyPluginAsync } from 'fastify';
import status from '../lib/httpStatusCodes';
import { getSuggestions } from './queries';
import { listSuggestions } from './schemas';

const suggestionRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: listSuggestions,
    handler: async (request, reply) => {
      const userId: AuthUserID = request.authUser.id;
      const suggestions = await getSuggestions(fastify.knex, userId);

      reply
        .status(status.HTTP_200_OK)
        .send(suggestions);
    },
  });
};

export default suggestionRoutes;
