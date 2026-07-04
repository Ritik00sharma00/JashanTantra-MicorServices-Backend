import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const sslEnabled = config.get<string>('DB_SSL') === 'true';
        const certPath = path.resolve(process.cwd(), 'apps', 'user-service', 'ca.pem');

        return {
          type: 'postgres' as const,
          host: config.get<string>('DB_HOST'),
          port: Number(config.get('DB_PORT')),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          ssl: sslEnabled
            ? {
                ca: fs.existsSync(certPath)
                  ? fs.readFileSync(certPath, 'utf8')
                  : undefined,
                rejectUnauthorized: false,
              }
            : false,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [AppController, EventController],
  providers: [AppService, EventService],
})
export class AppModule {}
