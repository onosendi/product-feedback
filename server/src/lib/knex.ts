import Knex from 'knex';
import getKnexConfig from '../../knexfile';

const knex = Knex(getKnexConfig());

export default knex;
