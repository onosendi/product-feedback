import camelCaseKeys from 'camelcase-keys';
import knex from 'knex';
import knexConfig from '../../knexfile';

export default knex({
  ...knexConfig,
  postProcessResponse: (response) => camelCaseKeys(response, { deep: true }),
});
