import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import {AppModule}   from "./app.module"
import { Logger } from "@nestjs/common";

async function bootstrap() {
   process.title = 'user';

   const logger = new Logger('UserBootstrap');

   const portValue = process.env['Jashanport'];
   if (!portValue) {
      throw new Error('Jashanport is not defined in the environment');
   }
   const port = parseInt(portValue, 10);
   if (Number.isNaN(port)) {
      throw new Error('Jashanport must be a valid number');
   }

  const rmqUrl = process.env['rabbitmq'];
  if (!rmqUrl) {
    throw new Error('rabbitmq is not defined in the environment');
  }

   const queue = process.env['service'];
   if (!queue) {
     throw new Error('service is not defined in the environment');
   }

   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
     AppModule,
     {
       transport: Transport.RMQ,
       options:{
        urls:[rmqUrl],
        socketOptions:{ heartbeat:60 },
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