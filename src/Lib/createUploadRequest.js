// import request from "superagent";
import axios from "axios";

export const createUploadRequest = (imageSrc, progressCallback) => {
  return axios.post(
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
    {
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      file: imageSrc,
    },
    {
      onUploadProgress: progressCallback,
    }
  );
};
