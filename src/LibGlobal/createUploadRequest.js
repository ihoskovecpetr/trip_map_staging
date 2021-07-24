export const createUploadRequest = (
  imageSrc,
  progressCallback,
  axiosInstance,
  axiosCancelTokenSource
) => {
  return axiosInstance.post(
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
    {
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      file: imageSrc,
    },
    {
      onUploadProgress: progressCallback,
      cancelToken: axiosCancelTokenSource.token,
    }
  );
};
