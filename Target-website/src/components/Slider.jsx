import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const images = [
  {
    url: "https://orascom.com/wp-content/uploads/DJI_0104-0-e1687423876762-1366x768.jpg",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    title: "Image 1",
  },
  {
    url: "https://orascom.com/wp-content/uploads/Plant-1-Bahr-2.png",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    title: "Image 2",
  },
  {
    url: "https://orascom.com/wp-content/uploads/Clarkson-Aerial-Jan2023-5-1366x768.png",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    title: "Image 3",
  },
];

const FullscreenSlider = () => {
  return (
    <div
      style={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa", // Optional background color
      }}
    >

      <div className="img"
        style={{
          maxWidth: "100vw", // Optional max width for the slider  
          // display: "flex",
          alignContent: "center",
          // height: "100%", // Full height for the slider
          borderRadius: "10px", // Rounded corners for the card look
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Card shadow
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          style={{ height: "100%" }} // Ensure the slider takes up full height
        >
          {images.map(({ url, backgroundSize, backgroundRepeat, backgroundPosition, title }, index) => (
            <SwiperSlide key={index}>
               
              <div
                style={{
                  height: "100vh",
                  backgroundImage: `url(${url})`,
                  backgroundSize,
                  backgroundRepeat,
                  backgroundPosition,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end", 
                  position: "relative", 
                }}
              >
               
              <h1
              style={{
                fontSize: "2rem",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                bottom: "40px", // Adjust based on your preference
                textAlign: "center",
                width: "100%",
              }}
            >
              {title}
            </h1>
            
              </div>
                  
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FullscreenSlider;
