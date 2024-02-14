import { FileUploadService } from './file-upload.service';
import { BufferedFile } from '../minio-client/file.model';
export declare class FileUploadController {
    private fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadSingle(image: BufferedFile): Promise<{
        image_url: string;
        message: string;
    }>;
    uploadMany(files: BufferedFile[]): Promise<{
        url: string;
    }[]>;
}
