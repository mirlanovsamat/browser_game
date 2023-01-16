import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { YandexS3 } from './yandex-s3';
import { EXT } from './constants';

@Injectable()
export class FileService {
  constructor(private readonly yandexS3: YandexS3) {}

  async upload(file: Express.Multer.File): Promise<any> {
    if (!EXT.includes(file.mimetype.split('/')[1])) {
      throw new UnprocessableEntityException('Incorrect file extension');
    }
    return await this.yandexS3.upload(file.buffer, 'game');
  }
}
