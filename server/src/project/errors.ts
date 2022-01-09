import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import status from './httpStatusCodes';

export const INSUFFICIENT_PRIVILEGES = 'INSUFFICIENT_PRIVILEGES';
export const INVALID_PASSWORD = 'INVALID_PASSWORD';
export const INVALID_USERRNAME_OR_PASSWORD = 'INVALID_USERRNAME_OR_PASSWORD';
export const RECORD_NOT_FOUND = 'RECORD_NOT_FOUND';
export const USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS';

export default function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error.message === INSUFFICIENT_PRIVILEGES) {
    const err = new Error('Insufficient privileges');
    reply.status(status.HTTP_403_FORBIDDEN).send(err);
    return;
  }

  if (error.message === INVALID_PASSWORD) {
    const err = new Error('Invalid password');
    reply.status(status.HTTP_400_BAD_REQUEST).send(err);
    return;
  }

  if (error.message === INVALID_USERRNAME_OR_PASSWORD) {
    const err = new Error('Invalid username or password');
    reply.status(status.HTTP_401_UNAUTHORIZED).send(err);
    return;
  }

  if (error.message === RECORD_NOT_FOUND) {
    const err = new Error('Record not found');
    reply.status(status.HTTP_404_NOT_FOUND).send(err);
    return;
  }

  if (error.message === USERNAME_ALREADY_EXISTS) {
    const err = new Error('Username already exists');
    reply.status(status.HTTP_400_BAD_REQUEST).send(err);
    return;
  }

  reply.send(error);
}
