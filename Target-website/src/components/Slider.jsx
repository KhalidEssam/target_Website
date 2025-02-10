import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const images = [
  
  {
    url: "https://target-for-engineering.com/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-11-at-11.56.46-AM.jpeg",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    title: "Image 1",
  },
  {
    url: "https://target-for-engineering.com/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-11-at-11.16.46-AM.jpeg",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    title: "Image 2",
  },
  {
    url: "https://target-for-engineering.com/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-11-at-11.45.33-AM.jpeg",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    title: "Image 3",
  },
];

const FullscreenSlider = () => {
  const direction = useSelector((state) => state.language.direction); // Get direction (rtl or ltr) from the language state
  const [swiperKey, setSwiperKey] = useState(0);
  const swiperRef = useRef(null);

  // Force re-render when direction changes
  useEffect(() => {
    setSwiperKey((prev) => prev + 1); // Update key to force Swiper re-initialization

    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(0, 0, 0); // Reset position
    }
  }, [direction]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="img"
        style={{
          maxWidth: "100vw",
          alignContent: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Swiper
          key={swiperKey} // 🔥 Forces Swiper to reinitialize when direction changes
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={1}
          dir={direction} // ✅ Correctly update Swiper direction
          style={{ height: "100%" }}
          className="gray-effect"
        >
          {images.map(({ url, backgroundSize, backgroundRepeat, backgroundPosition }, index) => (
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
                    bottom: "40px",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  .
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
