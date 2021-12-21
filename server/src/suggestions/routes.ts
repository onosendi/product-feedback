import type { DBSuggestionCategories } from '@t/database';
import type { FastifyPluginAsync } from 'fastify';
import status from '../lib/httpStatusCodes';
import { getSuggestions } from './queries';
import { listSuggestions } from './schemas';

const suggestionRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.route<{
    Querystring: {
      category: DBSuggestionCategories;
      order: 'asc' | 'desc';
      sort: 'votes' | 'comments';
    },
  }>({
    method: 'GET',
    url: '/',
    schema: listSuggestions,
    handler: async (request, reply) => {
      const userId = request.authUser.id;

      const suggestions = getSuggestions(fastify.knex, userId)
        .where({ 's.status': 'suggestion' });

      const categories = request.query?.category?.split(',');
      if (categories) {
        suggestions.whereIn('category', categories);
      }

      const order = request.query?.order === 'asc' ? 'asc' : 'desc';
      const sorting = request.query?.sort;
      const sort = ['votes', 'comments'].includes(sorting) ? sorting : 'votes';
      suggestions.orderBy(sort, order);

      reply
        .status(status.HTTP_200_OK)
        .send(await suggestions);
    },
  });
};

export default suggestionRoutes;
