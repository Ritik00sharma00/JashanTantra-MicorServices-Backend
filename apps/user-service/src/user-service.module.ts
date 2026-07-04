import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entitites/user.entity';
import * as fs from 'fs';
import * as path from 'path';

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
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
