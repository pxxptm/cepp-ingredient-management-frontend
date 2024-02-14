import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
export declare class MinioClientService {
    private readonly minio;
    private readonly logger;
    private readonly baseBucket;
    private readonly endPoint;
    private readonly port;
    get client(): Minio.Client;
    constructor(minio: MinioService);
    upload(file: BufferedFile, baseBucket?: string): Promise<{
        url: string;
    }>;
    delete(objectName: string, baseBucket?: string): Promise<void>;
}
