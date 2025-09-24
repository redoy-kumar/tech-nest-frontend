const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "tech-nest-product"); // preset must exist in your Cloudinary settings

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
 
    const data = await response.json();
    return data; // contains secure_url, public_id, etc.
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};

export default uploadImage;
