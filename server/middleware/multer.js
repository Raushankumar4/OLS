import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${uniqueSuffix}.${fileExtension}`);
  },
});

export const upload = multer({ storage: storage });
