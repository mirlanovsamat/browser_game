import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DatabaseModule from './configuration/database/database.module';
import { RatingModule } from './modules/rating/rating.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
