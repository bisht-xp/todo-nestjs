import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Server is Running`)
}
bootstrap();
