import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ApiKeyGuard } from './api-key.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    ClientsModule.register([
      {
        name: 'Service Client',
        transport: Transport.RMQ,
        options: {
          urls: [process.env['rabbitmq'] as string],
          socketOptions: { heartbeat: 60 },
          queue: process.env['service'] as string,
          queueOptions: { durable: false },
        },
      },
      {
        name: 'User Client',
        transport: Transport.RMQ,
        options: {
          urls: [process.env['rabbitmq'] as string],
          socketOptions: { heartbeat: 60 },
          queue: process.env['user_queue'] as string,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [
    GatewayService,
    ApiKeyGuard,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class GatewayModule {}
