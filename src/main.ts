import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  })
  const PORT = 3000;
  await app.listen(PORT);
  console.log(`App is running on: ${ await app.getUrl() }`);
}
bootstrap();
