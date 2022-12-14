import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DatabaseModule from './configuration/database/database.module';
import { UserModule } from './modules/user/user.module';
import { WebsocketGateway } from './modules/websocket/websocket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    WebsocketGateway
  ],
})
export class AppModule {}
