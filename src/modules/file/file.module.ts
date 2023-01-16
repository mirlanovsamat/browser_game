import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { YandexS3 } from './yandex-s3';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileService, YandexS3],
  exports: [],
})
export class FileModule {}
