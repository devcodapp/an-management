import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as swaggerUi from 'swagger-ui-express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('WebForge')
    .setDescription('WebForge API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));

  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(process.env.PORT || 3333);

  console.log(
    `\x1b[33m 🚀 💻 ::: Server running on port ${process.env.PORT || 3333
    }\x1b[0m \n`,
  );
  console.log(
    `\x1b[33m 📝 💻 ::: Swagger http://localhost:${process.env.PORT || 3333
    }/api\x1b[0m`,
  );
}

bootstrap();
