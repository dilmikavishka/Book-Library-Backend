import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/imagekit.controller";

const ImageKitRouter = express.Router();
const upload = multer({ dest: "uploads/" });


ImageKitRouter.post("/", upload.single("file"), uploadImage);

export default ImageKitRouter;
