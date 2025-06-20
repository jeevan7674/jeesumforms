import { GridFsStorage } from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';
import { bucket } from './db.js';


export const configureGridFsStorage = (url, bucketName = 'uploads', cryptoLength = 16) => {
    return new GridFsStorage({
        url: url,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        file: async (req, file) => {
            const filename = await new Promise((resolve, reject) => {
                crypto.randomBytes(cryptoLength, (err, buf) => {
                    if (err) reject(err);
                    resolve(buf.toString('hex') + path.extname(file.originalname));
                });
            });
            return {
                filename: filename,
                bucketName: bucketName 
            };
        }
    });
};

