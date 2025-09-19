import { Injectable } from "@nestjs/common";
import { path } from "app-root-path";
import { ensureDir, writeFile } from "fs-extra";
import { v4 as uuidv4 } from "uuid";

import type { FileResponse } from "./interfaces/file.interface";

@Injectable()
export class FileService {
  async saveFiles(files: Express.Multer.File[], folder: string = "products") {
    const uploadedFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadedFolder);

    const response: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        const originalName = `${uuidv4()}-${file.originalname}`;

        await writeFile(`${uploadedFolder}/${originalName}`, file.buffer);

        return {
          url: `/uploads/${folder}/${originalName}`,
          name: originalName
        };
      })
    );

    return response;
  }
}
