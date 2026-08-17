import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './shared/logger/index.js';

const app = createApp();

app.listen(env.PORT, () => {
  logger.info(`ATS API listening on port ${env.PORT} [${env.NODE_ENV}]`);
});
