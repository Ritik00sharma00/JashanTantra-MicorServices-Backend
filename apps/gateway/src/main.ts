import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  process.title = 'gateway';

  const logger = new Logger('GatewayBootstrap');
  const port = parseInt(process.env.gateWay || '3000', 10);

  const app = await NestFactory.create(GatewayModule);
  app.enableShutdownHooks();
  app.enableCors();

  await app.listen(port);
  logger.log(`Gateway is running on http://localhost:${port}`);
}
bootstrap();