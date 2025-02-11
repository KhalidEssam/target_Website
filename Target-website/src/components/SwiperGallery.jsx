import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const SwiperGallery = ({ content }) => {
  // Destructure with fallbacks

  const imageUrls = Object.keys(content || {}).reduce((acc, key) => {
    if (key === "imageUrls") {
      return content[key];
    }
    else if (key === "props") {
      return content[key].imageUrls;
      
    }
    return acc;
  }, []);

  // If no images are provided, show a message
  if (!imageUrls || imageUrls.length === 0) {
    return <p>No images to display.</p>;
  }

  return (
    <div className="swiper-container">
      <h4>{content.text}</h4>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="custom-swiper"
      >
      {imageUrls.map((src, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="swiper-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperGallery;

