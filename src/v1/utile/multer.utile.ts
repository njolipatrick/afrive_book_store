import { Request } from 'express';
import multer from 'multer';
type file = {
    mimetype: string;
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});

const fileFilter = (req: Request, file: file, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb({ message: `Unspported file format1 ${file.mimetype}` });
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 4200 * 3800 },
    fileFilter
});
export default upload;

