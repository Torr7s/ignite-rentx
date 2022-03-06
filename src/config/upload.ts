import multer from 'multer';
import crypto from 'crypto';

import { resolve } from 'path';
import { Request } from 'express';

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request: Request, file: Express.Multer.File, callback) => {
          const fileHash: string = crypto.randomBytes(16).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      })
    }
  }
}