import path from "path";
import express from "express";
import multer from "multer";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "staticuploads/");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
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

// router.post(
//   "/hsp",
//   protect,
//   admin,
//   upload.single("HomeScreenPic1"),
//   (req, res) => {
//     res.send(`/${req.file.path}`);
//   }
// );
router.post(
  "/:value",
  protect,
  admin,
  (req, res, next) => {
    const { value } = req.params;
    const dynamicUpload = upload.single(`ScreenPic${value}`);
    dynamicUpload(req, res, (err) => {
      if (err) {
        // Handle any errors from the upload middleware
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },

  (req, res) => {
    res.send(`/${req.file.path}`);
  }
);

export default router;
