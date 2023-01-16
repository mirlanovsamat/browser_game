import { Injectable } from '@nestjs/common';
import EasyYandexS3 from 'easy-yandex-s3';
import * as uuid from 'uuid';

const BUCKET_NAME = 'discovery';
const ACCESS_KEY_ID = 'YCAJEmx-2NK57xKI2y-jV4_nX';
const SECRET_ACCESS_KEY = 'YCN1jEOEp3_pTfbD7Ae0yAJOZSky7ghtuMA92ZEG';

@Injectable()
export class YandexS3 {
  private readonly s3: EasyYandexS3;

  constructor() {
    this.s3 = new EasyYandexS3({
      auth: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
      Bucket: BUCKET_NAME,
      debug: false,
    });
  }

  async upload(buffer: any, directoryPath = '/'): Promise<any> {
    const file = await this.s3.Upload(
      { buffer: buffer, name: uuid.v4() },
      directoryPath,
    );
    if (Array.isArray(file)) return file[0].Location;
    if (file === false) return false;
    return file.Location;
  }
}
