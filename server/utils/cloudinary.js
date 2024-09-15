import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudnary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    if (response.response === "error") throw new Error(response.message);
    console.log("File uploaded to Cloudinary:", response.secure_url);
    return response.secure_url;
  } catch (error) {
    console.log("Error uploading file to Cloudinary:", error.message);
    return null;
  }
};

export { uploadOnCloudnary };
