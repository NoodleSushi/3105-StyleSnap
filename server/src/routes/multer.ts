import multer, { FileFilterCallback } from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export const uploadDirectory = 'public/uploads/';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.createHash('sha1')
      .update(Date.now().toString())
      .update(file.originalname)
      .digest('hex');
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"));
  }
}


export const upload = multer({ storage, fileFilter });
