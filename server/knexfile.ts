import dotenv from 'dotenv';
import getKnexConfig from './src/lib/knexConfig';

dotenv.config();

export default getKnexConfig();
