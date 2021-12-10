import 'fastify';

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: { userId: string },
  }
}
