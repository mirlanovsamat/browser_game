import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;
  app.enableCors({
    origin: '*',
    credentials: true,
  })
  app.setGlobalPrefix('api')
  await app.listen(PORT);
  console.log(`App is running on: ${ await app.getUrl() }`);
}
bootstrap();
