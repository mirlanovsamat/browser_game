import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        logging: false,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        migrations: ['dist/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        migrationsRun: false,
        migrationsTableName: 'migrations',
      }),
    }),
  ],
})
class DatabaseModule {}

export default DatabaseModule;
