import type { DBSuggestionCategories, DBSuggestionStatus } from '@t/database';
import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import makeSlug from '../lib/makeSlug';
import { getSuggestions } from './queries';
import { createSuggestionSchema, listSuggestionsSchema } from './schemas';

const suggestionRoutes: FastifyPluginAsync = async (fastify) => {
  // User must have admin to specify a suggestion's status
  fastify.decorate(
    'statusNeedsAdmin',
    async (
      request: FastifyRequest<{
        Body: { status: DBSuggestionStatus; },
      }>,
      reply: FastifyReply,
    ) => {
      const { role } = request.authUser;

      if (request.body.status && role !== 'admin') {
        const error = new Error('Insufficient privileges: can\'t set status');
        reply
          .status(status.HTTP_403_FORBIDDEN)
          .send(error);
      }
    },
  );

  // List suggestions
  fastify.route<{
    Querystring: {
      category: DBSuggestionCategories;
      order: 'asc' | 'desc';
      sort: 'votes' | 'comments';
    },
  }>({
    method: 'GET',
    url: '/',
    schema: listSuggestionsSchema,
    handler: async (request, reply) => {
      const userId = request.authUser.id;

      const suggestions = getSuggestions(fastify.knex, userId)
        .where({ 's.status': 'suggestion' });

      const { category } = request.query;
      const categories = Array.isArray(category)
        ? category
        : category && category.split(' ');
      if (categories) {
        suggestions.whereIn('category', categories);
      }

      const order = request.query?.order === 'asc' ? 'asc' : 'desc';
      const sorting = request.query?.sort;
      const sort = ['votes', 'comment_count'].includes(sorting)
        ? sorting
        : 'votes';
      suggestions.orderBy(sort, order);

      reply
        .status(status.HTTP_200_OK)
        .send(await suggestions);
    },
  });

  // Create suggestion
  fastify.route<{
    Body: {
      category: DBSuggestionCategories;
      description: string;
      status?: DBSuggestionStatus;
      title: string;
    },
  }>({
    method: 'POST',
    url: '/',
    schema: createSuggestionSchema,
    preValidation: [
      fastify.authenticate,
      fastify.statusNeedsAdmin,
    ],
    handler: async (request, reply) => {
      const { id: userId } = request.authUser;
      const {
        category,
        description,
        status: suggestionStatus = 'suggestion',
        title,
      } = request.body;
      const suggestionId = uuidv4();
      const slug = makeSlug(title);

      await fastify.knex.transaction(async (trx) => {
        const { id: categoryId } = await fastify
          .knex('suggestion_category')
          .select('id')
          .where({ category })
          .first()
          .transacting(trx);

        await fastify
          .knex('suggestion')
          .insert({
            id: suggestionId,
            title,
            slug,
            description,
            status: suggestionStatus,
            user_id: userId,
            category_id: categoryId,
          })
          .transacting(trx);
      });

      reply
        .status(status.HTTP_201_CREATED)
        .send(status.HTTP_201_CREATED);
    },
  });
};

export default suggestionRoutes;
