import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const uploadImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
        const ext = path.extname(file.originalname).toLowerCase();

        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});

export { uploadImage as upload };
