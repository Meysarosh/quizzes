import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/assets/img/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.headers.name}`);
  },
});

const upload = multer({ storage: storage });

app.use(cors());

app.post("/image", upload.single("file"), function (req, res) {
  res.json({});
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
