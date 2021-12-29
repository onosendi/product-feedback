import type { DBSuggestionCategories, DBSuggestionStatus } from '@t/database';
import type {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import makeSlug from '../lib/makeSlug';
import { getSuggestions } from './queries';
import {
  createSuggestionSchema,
  deleteSuggestionSchema,
  editSuggestionSchema,
  listSuggestionsSchema,
  suggestionDetailSchema,
} from './schemas';

const suggestionRoutes: FastifyPluginAsync = async (fastify) => {
  // User must have admin to specify a suggestion's status
  fastify.decorate(
    'needsAdminToModifyStatus',
    function (
      request: FastifyRequest<{
        Body: { status: DBSuggestionStatus; },
      }>,
      reply: FastifyReply,
      done: HookHandlerDoneFunction,
    ) {
      const { role } = request.authUser;

      if (request.body.status && role !== 'admin') {
        const error = new Error('Only administrators can change the status');
        reply
          .status(status.HTTP_403_FORBIDDEN)
          .send(error);
      }

      done();
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

  // Suggestion detail
  fastify.route<{
    Params: {
      slug: string;
    },
  }>({
    method: 'GET',
    url: '/:slug',
    schema: suggestionDetailSchema,
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'suggestion',
        tableColumn: 'slug',
      }),
    ],
    handler: async (request, reply) => {
      const { id: userId } = request.authUser;
      const { slug } = request.params;

      const suggestion = await getSuggestions(fastify.knex, userId)
        .where({ slug })
        .first();

      reply
        .status(status.HTTP_200_OK)
        .send(suggestion);
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
    preValidation: [fastify.needsAuthentication],
    preHandler: [fastify.needsAdminToModifyStatus],
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

  // Edit suggestion
  fastify.route<{
    Body: {
      category: DBSuggestionCategories;
      description: string;
      status?: DBSuggestionStatus;
      title: string;
    },
    Params: {
      suggestionId: string;
    },
  }>({
    method: 'PATCH',
    url: '/:suggestionId',
    schema: editSuggestionSchema,
    preValidation: [fastify.needsAuthentication],
    preHandler: [
      fastify.needsAdminToModifyStatus,
      fastify.decorateRequestDetail({
        select: ['status', 'title', 'slug'],
        table: 'suggestion',
      }),
      fastify.needsOwner,
    ],
    handler: async (request, reply) => {
      const { detail } = request;
      const { suggestionId } = request.params;

      const {
        category,
        description,
        status: suggestionStatus = detail?.status,
        title,
      } = request.body;

      const slug = title === detail?.title
        ? detail.slug
        : makeSlug(title);

      await fastify.knex.transaction(async (trx) => {
        const { id: categoryId } = await fastify
          .knex('suggestion_category')
          .select('id')
          .where({ category })
          .first()
          .transacting(trx);

        await fastify
          .knex('suggestion')
          .update({
            category_id: categoryId,
            description,
            slug,
            status: suggestionStatus,
            title,
          })
          .where({ id: suggestionId })
          .transacting(trx);
      });

      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });

  // Delete suggestion
  fastify.route<{
    Params: {
      suggestionId: string;
    },
  }>({
    method: 'DELETE',
    url: '/:suggestionId',
    schema: deleteSuggestionSchema,
    preValidation: [fastify.needsAuthentication],
    preHandler: [
      fastify.decorateRequestDetail({
        select: ['id'],
        table: 'suggestion',
      }),
      fastify.needsOwner,
    ],
    handler: async (request, reply) => {
      const { suggestionId } = request.params;

      await fastify
        .knex('suggestion')
        .where({ id: suggestionId })
        .delete();

      reply.status(status.HTTP_204_NO_CONTENT);
    },
  });
};

export default suggestionRoutes;
