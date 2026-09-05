import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { UserServiceModule } from "./user-service.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
   process.title = 'user';

   const logger = new Logger('UserBootstrap');

   const port = process.env.userPort ? parseInt(process.env.userPort, 10) : 3002;

  const rmqUrl=process.env.rabbitmq ?? "amqp://localhost:5672";

   const queue=process.env.user_queue ??"user_queue";

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