import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [
    MinioModule.register({
      endPoint: '100.111.182.51',
      port: 9000,
      useSSL: false,
      accessKey: 'JXNVpF0AulqAC4VoHoms',
      secretKey: 'WbWkib0Q3j0XrjnQ8Q0DEjSm8UGzVQST3Zfyq3O8',
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
