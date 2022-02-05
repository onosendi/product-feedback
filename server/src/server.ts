import type { CloseWithGraceAsyncCallback } from 'close-with-grace';
import closeWithGrace from 'close-with-grace';
import Fastify from 'fastify';
import fp from 'fastify-plugin';
import app from './app';
import options from './server-options';

async function run() {
  const fastify = Fastify(options);

  await fastify.register(fp(app));

  const closeWithGraceCallback: CloseWithGraceAsyncCallback = async ({ err }) => {
    if (err) {
      fastify.log.error(err);
    }
    await fastify.close();
  };

  const closeListeners = closeWithGrace({ delay: 500 }, closeWithGraceCallback);

  fastify.addHook('onClose', (instance, done) => {
    closeListeners.uninstall();
    done();
  });

  try {
    fastify.listen({
      host: fastify.config.APP_HOST,
      port: fastify.config.APP_PORT,
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

run();
