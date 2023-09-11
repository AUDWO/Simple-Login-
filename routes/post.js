const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { afterUploadImage, uploadPost } = require("../controllers/post");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

//웹사이트 뿐 아니라 postMan같은 앱으로 사진을 등록할 수 있기 때문에 로그인 여부를 서버에서 따져서 더욱 완벽하게 만들어줌
router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);

const upload2 = multer();

router.post("/", isLoggedIn, upload2.none(), uploadPost);

module.exports = router;
