import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from '@/config';
import { errorMiddleware } from '@/middleware/error';
import { notFoundMiddleware } from '@/middleware/notFound';
import apiRoutes from '@/routes';

const app: Application = express();

/**
 * @summary
 * Security middleware configuration
 */
app.use(helmet());
app.use(cors(config.api.cors));

/**
 * @summary
 * Request processing middleware
 */
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * @summary
 * Logging middleware
 */
if (config.server.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

/**
 * @api {get} /health Health Check
 * @apiName HealthCheck
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiDescription Returns the health status of the application
 *
 * @apiSuccess {String} status Application status
 * @apiSuccess {String} timestamp Current timestamp
 * @apiSuccess {String} version API version
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: config.api.version,
  });
});

/**
 * @summary
 * API Routes with versioning
 * Creates routes like:
 * - /api/v1/external/...
 * - /api/v1/internal/...
 */
app.use('/api', apiRoutes);

/**
 * @summary
 * 404 handler for undefined routes
 */
app.use(notFoundMiddleware);

/**
 * @summary
 * Global error handling middleware
 */
app.use(errorMiddleware);

/**
 * @summary
 * Graceful shutdown handler
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

/**
 * @summary
 * Server startup
 */
const server = app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port} in ${config.server.nodeEnv} mode`);
  console.log(`API available at: http://localhost:${config.server.port}/api/${config.api.version}`);
});

export default server;
