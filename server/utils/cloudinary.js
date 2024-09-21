import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudnary = async (localfilePath) => {
  if (!localfilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });

    try {
      fs.unlinkSync(localfilePath);
    } catch (unlinkError) {
      console.error("Error deleting local file after upload:", unlinkError);
    }

    return response;
  } catch (error) {
    try {
      fs.unlinkSync(localfilePath);
    } catch (unlinkError) {
      console.error(
        "Error deleting local file after upload failure:",
        unlinkError
      );
    }
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudnary };
