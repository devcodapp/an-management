import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));
  // app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(process.env.PORT || 3333);

  console.clear()

  console.log(
    `\x1b[33m 🚀 💻 ::: Server running on port ${process.env.PORT || 3333
    }\x1b[0m \n`,
  );
}


bootstrap()