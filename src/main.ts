
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app-module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import {LoggingInterceptor} from './auth/auth.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my NestJS project')
    .setVersion('1.0')
    .addBearerAuth() // If using JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(process.env.PORT ||3000);
}
bootstrap();
