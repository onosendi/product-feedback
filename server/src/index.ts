import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import authRoute from './auth/routes';
import config from './config';

const server = express();
server.disable('x-powered-by');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cookieParser());
server.use(cors(config.cors));
server.use(morgan('dev'));

server.use('/auth', authRoute);

server.listen(<number>config.port, config.ip, () => {
  // eslint-disable-next-line no-console
  console.log(`> Listening on ${config.ip}:${config.port}`);
});
