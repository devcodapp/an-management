import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(process.env.PORT || 3333);

  console.log(
    `\x1b[33m 🚀 💻 ::: Server running on port ${process.env.PORT || 3333
    }\x1b[0m \n`,
  );
}


bootstrap()