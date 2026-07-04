import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import {AppModule}   from "./app.module"
import { Logger } from "@nestjs/common";

async function bootstrap() {
   process.title = 'user';

   const logger = new Logger('UserBootstrap');

   const port = process.env.userPort ? parseInt(process.env.userPort, 10) : 3002;

   const rmqUrl=process.env.rabbitmq ?? " amqp://localhost:5672";

   const queue=process.env.service ?? "service";

   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
     AppModule,
     {
       transport: Transport.RMQ,
       options:{
        urls:[rmqUrl],
        queue,
        queueOptions:{
          durable:false
        }
       }
      
     },
   );

   app.enableShutdownHooks();

   await app.listen();
   logger.log(`Jashan tantra service is running on ${port} from rabbit maq`);
}
bootstrap();