import { BufferedFile } from '../minio-client/file.model';
import { MinioClientService } from '../minio-client/minio-client.service';
export declare class FileUploadService {
    private minioClientService;
    constructor(minioClientService: MinioClientService);
    uploadSingle(image: BufferedFile): Promise<{
        image_url: string;
        message: string;
    }>;
    uploadMany(files: BufferedFile[]): Promise<{
        url: string;
    }[]>;
}
