import camelCaseKeys from 'camelcase-keys';
import knex from 'knex';
import config from '../config';

export default knex({
  ...config.database,
  postProcessResponse: (response) => camelCaseKeys(response, { deep: true }),
});
