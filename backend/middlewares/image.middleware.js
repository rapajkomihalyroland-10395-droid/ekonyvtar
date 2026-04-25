import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "../storage");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    const safeName = req.body.cim
      ? req.body.cim.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      : "book";

    cb(null, `${safeName}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({ storage });
