import Knex from 'knex';
import getKnexConfig from '../../knexfile';

const KnexInstance = Knex(getKnexConfig());

export default KnexInstance;
