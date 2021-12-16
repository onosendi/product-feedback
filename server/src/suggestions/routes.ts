import { FastifyPlugin } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import status from '../lib/httpStatusCodes';
import knex from '../lib/knex';
import { listSuggestions } from './schemas';

const suggestionRoutes: FastifyPlugin = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preValidation: [fastify.authenticate],
    schema: listSuggestions,
    handler: async (request, reply) => {
      const { user } = request;

      console.log(user);

      const userId = uuidv4();

      const suggestions = await knex('suggestion as s')
        .select(
          's.id',
          's.title',
          's.slug',
          's.description',
          's.user_id',
          knex.raw('coalesce(votes, 0) as votes'),
          knex.raw('coalesce(comments, 0) as comments'),
          knex.raw('hv.suggestion_id is distinct from null as has_voted'),
          { category: 'sc.display' },
        )
        .join('suggestion_category as sc', 'sc.id', 's.category_id')
        .leftJoin(
          knex('suggestion_vote')
            .select('suggestion_id', knex.raw('count(id) as votes'))
            .groupBy('suggestion_id')
            .as('v'),
          'v.suggestion_id', '=', 's.id',
        )
        .leftJoin(
          knex('suggestion_comment')
            .select('suggestion_id', knex.raw('count(id) as comments'))
            .groupBy('suggestion_id')
            .as('c'),
          'c.suggestion_id', '=', 's.id',
        )
        .leftJoin(
          knex('suggestion_vote')
            .select('suggestion_id')
            .where({ user_id: userId ?? null })
            .groupBy('suggestion_id')
            .as('hv'),
          'hv.suggestion_id', '=', 's.id',
        );

      reply
        .status(status.HTTP_200_OK)
        .send(suggestions);
    },
  });

  done();
};

export default suggestionRoutes;
