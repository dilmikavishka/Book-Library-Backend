import { Request, Response } from "express";
import fs from "fs";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const fileBuffer = fs.readFileSync(req.file.path);

    const result = await imagekit.upload({
      file: fileBuffer, 
      fileName: req.file.originalname,
      folder: "/uploads",
    });

    fs.unlinkSync(req.file.path); 

    return res.json({ url: result.url });
  } catch (error: any) {
    console.error("Image upload error:", error?.message || error);
    return res.status(500).json({ error: "Upload failed", details: error?.message || error });
  }
};
