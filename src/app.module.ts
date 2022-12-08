import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingModule } from './modules/rating/rating.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://soma:529145nktl@database.fsldwif.mongodb.net/?retryWrites=true&w=majority'),
    UserModule,
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
