import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { UserServiceModule } from "./user-service.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
   process.title = 'user';

   const logger = new Logger('UserBootstrap');

   const portValue = process.env['userPort'];
   if (!portValue) {
      throw new Error('userPort is not defined in the environment');
   }
   const port = parseInt(portValue, 10);
   if (Number.isNaN(port)) {
      throw new Error('userPort must be a valid number');
   }

  const rmqUrl = process.env['rabbitmq'];
  if (!rmqUrl) {
    throw new Error('rabbitmq is not defined in the environment');
  }

   const queue = process.env['user_queue'];
   if (!queue) {
     throw new Error('user_queue is not defined in the environment');
   }

   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
     UserServiceModule,
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
   logger.log(`User service is running on ${port} from rabbit maq`);
}
bootstrap();