import restify, { plugins } from 'restify';
import corsMiddleware from 'restify-cors-middleware';

import authRoutes from './routes/auth';
import peopleRoutes from './routes/people';

import db from './config/db';

const server = restify.createServer();

const port = 3000;

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['*', 'Authorization'],
  exposeHeaders: ['*'],
});

server.pre(cors.preflight);
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(plugins.requestLogger());
server.use(cors.actual);

server.opts('*', (req, res) => {
  res.send(204);
});

authRoutes.applyRoutes(server);
peopleRoutes.applyRoutes(server);

server.listen(port, () => {
  try {
    db.sync();
  } catch (err) {
    logger.error({ err });
    process.exit(0);
  }
  console.log(`🎂 Married to port ${port}`);
});