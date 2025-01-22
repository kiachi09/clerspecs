import path from "path";
import express from "express";
import multer from "multer";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
    0;
  },
});

router.post("/", protect, admin, upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});
router.post(
  "/PrescriptionImage",
  upload.single("PrescriptionImage"),
  (req, res) => {
    res.send(`/${req.file.path}`);
  }
);

export default router;
