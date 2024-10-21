const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
const cloudinaryApiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export const uploadImageOnCloud = async (image: Blob) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Forms_app_images");
    formData.append("folder", "template_images");

    const response = await fetch(cloudinaryApiUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        imageUrl: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error(data.error.message || "Image upload failed");
    }
  } catch (error: unknown) {
    console.log("Failed to upload image to Cloudinary", error);
    throw error;
  }
};
