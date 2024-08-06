import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './infrastructure/package/config/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
            .setTitle('E-Commerce')
            .setDescription('OpenApi Documentation')
            .setVersion('1.0.0')
            .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
