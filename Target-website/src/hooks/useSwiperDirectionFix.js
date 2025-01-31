import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Swiper from "swiper";

const useSwiperDirectionFix = () => {
  const direction = useSelector((state) => state.language.direction);
  const swiperRef = useRef(null);

  useEffect(() => {
    // Check if Swiper is already initialized
    if (swiperRef.current && !swiperRef.current.swiper) {
      swiperRef.current.swiper = new Swiper(swiperRef.current, {
        direction: direction === "rtl" ? "rtl" : "ltr",  // Set direction based on state
        loop: true,
        autoplay: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      swiperRef.current.swiper.update();  // Ensure Swiper updates after initialization
    }
  }, [direction]);  // Re-run this effect when direction changes

  return swiperRef;  // Return the reference to be used in the component
};

export default useSwiperDirectionFix;
