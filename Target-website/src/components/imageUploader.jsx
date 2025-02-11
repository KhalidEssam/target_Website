import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import UserGallery from "./Gallery"; // Ensure this component is implemented

const ImageUploader = ({ UserID,onImagesSelected  }) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (onImagesSelected) {
        onImagesSelected(selectedImages); // Update parent whenever selected images change
      }
    }, [selectedImages]);
  

  const validateFile = (file) => {
    if (!file) return false;
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    return validTypes.includes(file.type);
  };

  const handleBrowseImage = async (e, itemId) => {
    const file = e.target?.files?.[0];
    if (!validateFile(file)) return;


    setIsLoading(true); // Start loading animation

    const formData = new FormData();
    formData.append("file", file);
    formData.append("itemId", itemId);

    try {
      // Upload image
      const response = await fetch("/api/upload-single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const uploadedImageUrl = data.imageUrl;
      setSelectedImages((prevImages) => [...prevImages, uploadedImageUrl]);
      console.log("Uploaded image URL:", selectedImages);


      // Update user gallery with the uploaded image
      const response2 = await fetch(`/api/galleries/${UserID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrls: [uploadedImageUrl] }),
      });
      const data2 = await response2.json();
      if (!response2.ok) throw new Error(data2.error);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };
  useEffect(() => {
      const handleImageChange = () => {
        if (!selectedImages.includes(window.selectedImageUrl)) {
          setSelectedImages((prevImages) => [...prevImages, window.selectedImageUrl]);
        }
        console.log("New Selected Image:", window.selectedImageUrl);
      };
  
      window.addEventListener("selectedImageChange", handleImageChange);
  
      return () => {
        window.removeEventListener("selectedImageChange", handleImageChange);
      };
    }, []);


  return (
    <div>
      <button onClick={() => setIsGalleryOpen(!isGalleryOpen)}>Add image from user gallery</button>

      {isGalleryOpen &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}
          >
            <button onClick={() => setIsGalleryOpen(null)}>Close</button>
            <UserGallery />

            <button
              onClick={() => {
                if (!selectedImages) return;
               
                setIsGalleryOpen(null);
                setSelectedImages(); // Reset selected image
              }}
            >
              Confirm Selection
            </button>

            <input type="file" accept="image/*" onChange={(e) => handleBrowseImage(e, "1231248791264")} />
          </div>,
          document.body
        )}
    </div>
  );
};

export default ImageUploader;
