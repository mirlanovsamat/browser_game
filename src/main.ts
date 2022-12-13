import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new WsAdapter(app))
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;
  app.enableCors({
    origin: '*',
    credentials: true,
  })
  await app.listen(PORT);
  console.log(`App is running on: ${ await app.getUrl() }`);
}
bootstrap();
