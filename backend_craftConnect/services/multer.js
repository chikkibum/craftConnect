
import multer from "multer";

const storage = multer.memoryStorage(); 

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024,
    files: 3,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Please upload an image file"));
    }
  },
});

export default upload;
