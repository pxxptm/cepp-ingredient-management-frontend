import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from '../minio-client/file.model';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('upload-file')
@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('single')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(@UploadedFile() image: BufferedFile) {
    return await this.fileUploadService.uploadSingle(image);
  }

  @Post('many')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadMany(@UploadedFiles() files: BufferedFile[]) {
    return this.fileUploadService.uploadMany(files);
  }
}
