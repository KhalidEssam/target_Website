import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserGallery = () => {
  const [gallery, setGallery] = useState({});
  const OktaId = useSelector((state) => state.user.userInfo.sub);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`/api/galleries/${OktaId}`);
        const data = await response.json();
        setGallery(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGallery();
  }, [OktaId]);

  const handleClick = (url) => {
    setSelectedImage(url);

    window.selectedImageUrl = url;
    window.dispatchEvent(new Event("selectedImageChange")); // Dispatch event
  };

  return (
    <div className="d-flex flex-wrap gap-3">
    {gallery.recentImages?.map((img, index) => (
      <div
        key={index}
        className={`p-2 border rounded ${selectedImage === img.url ? 'border-primary shadow-lg' : 'border-secondary'}`}
        style={{ cursor: 'pointer' }}
        onClick={() => handleClick(img.url)}
      >
        <img
          src={img.url}
          alt={`Uploaded ${index + 1}`}
          className="img-fluid rounded"
          style={{ width: '150px', height: 'auto' }}
        />
      </div>
    ))}
  </div>
  );
};

export default UserGallery;

// Styles
const styles = {
  galleryContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  imageWrapper: {
    width: "200px",
    height: "200px",
    overflow: "hidden",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    ":hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
