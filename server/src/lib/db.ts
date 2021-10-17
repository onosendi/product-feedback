import camelCaseKeys from 'camelcase-keys';
import knex from 'knex';

export default knex({
  // database config
  postProcessResponse: (response) => camelCaseKeys(response, { deep: true }),
});
