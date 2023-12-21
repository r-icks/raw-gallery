import express from "express"
const router=express.Router();

import { getGallery, getImage, uploadImage } from "../controllers/imageController.js";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage()
const upload = multer({storage})

router.route("/").post(upload.single('file'), uploadImage).get(getGallery);
router.route("/:id").get(getImage);

export default router