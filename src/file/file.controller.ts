import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

import { FileService } from "./file.service";
import { JwtAuth } from "src/auth/decorators/jwt-auth.decorator";

@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor("files"))
  @JwtAuth()
  async saveFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Query("folder") folder?: string
  ) {
    return this.fileService.saveFiles(files, folder);
  }
}
