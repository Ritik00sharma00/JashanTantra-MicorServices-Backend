import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  process.title = 'gateway';

  const logger = new Logger('GatewayBootstrap');
  const portValue = process.env['gateWay'];

  if (!portValue) {
    throw new Error('gateWay is not defined in the environment');
  }

  const port = parseInt(portValue, 10);

  if (Number.isNaN(port)) {
    throw new Error('gateWay must be a valid number');
  }

  const app = await NestFactory.create(GatewayModule);
  app.enableShutdownHooks();
  app.enableCors();

  await app.listen(port);
  logger.log(`Gateway is running on http://localhost:${port}`);
}
bootstrap();