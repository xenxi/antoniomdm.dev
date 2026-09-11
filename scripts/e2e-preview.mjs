import { performance } from 'node:perf_hooks';
import process from 'node:process';
import { preview } from 'astro';

const host = '127.0.0.1';
const port = Number(process.env.ANTONIOS_E2E_PORT ?? 4321);
const startedAt = performance.now();

let server;
let stopping = false;

async function stop(signal) {
  if (stopping) return;
  stopping = true;
  console.log(`[e2e-preview] Deteniendo por ${signal}. / Stopping on ${signal}.`);
  await server?.stop();
}

try {
  server = await preview({
    server: { host, port },
    vite: { preview: { strictPort: true } },
  });

  if (server.port !== port) {
    await server.stop();
    throw new Error(
      `El preview abrió el puerto inesperado ${server.port}; se esperaba ${port}. / ` +
        `Preview opened unexpected port ${server.port}; expected ${port}.`,
    );
  }

  console.log(
    `[e2e-preview] HTTP listo en http://${host}:${port}/; pid=${process.pid}; readiness_ms=${Math.round(performance.now() - startedAt)}. / ` +
      `HTTP ready at http://${host}:${port}/; pid=${process.pid}; readiness_ms=${Math.round(performance.now() - startedAt)}.`,
  );

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.once(signal, () => {
      void stop(signal).catch((error) => {
        console.error(`[e2e-preview] Falló el cierre. / Shutdown failed.`, error);
        process.exitCode = 1;
      });
    });
  }

  await server.closed();
  if (!stopping) {
    throw new Error('El servidor preview se cerró inesperadamente. / Preview server closed unexpectedly.');
  }
} catch (error) {
  console.error('[e2e-preview] No se pudo ejecutar el preview E2E. / Could not run the E2E preview.');
  console.error(error);
  process.exitCode = 1;
}
