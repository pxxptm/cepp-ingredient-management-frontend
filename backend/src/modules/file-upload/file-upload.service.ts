import { Injectable } from '@nestjs/common';
import { BufferedFile } from '../minio-client/file.model';
import { MinioClientService } from '../minio-client/minio-client.service';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    let uploaded_image = await this.minioClientService.upload(image);

    return {
      image_url: uploaded_image.url,
      message: 'Successfully uploaded to MinIO S3',
    };
  }

  async uploadMany(files: BufferedFile[]) {
    const uploaded_files = await Promise.all(
      files.map(async (file) => {
        const uploaded_file = await this.minioClientService.upload(file);
        return uploaded_file;
      }),
    );

    return uploaded_files;
  }
}
