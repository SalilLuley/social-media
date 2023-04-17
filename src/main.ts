import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { LoggerService } from './frameworks/logger/logger.service';
import { AllExceptionFilter } from './frameworks/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  mongoose.set('debug', Boolean(process.env.MONGO_LOG_LEVELS));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Social Media')
    .setDescription('This is Social Media API description')
    .setVersion('1.0')
    .addTag('social-media')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
