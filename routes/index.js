var express = require("express");
const { uploadFormData } = require("../service/googleSheetService.js");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });

var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "mini-proxy" });
});

router.post("/form", upload.array("files", 3), async function (req, res) {
  const sheetResponse = await uploadFormData(req.body, req.files);
  res.send(sheetResponse);
  res.end();
});

module.exports = router;
