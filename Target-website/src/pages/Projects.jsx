import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";

const projects = [
  {
    title: "Clarkson Aerial",
    image: "https://orascom.com/wp-content/uploads/Clarkson-Aerial-Jan2023-5-1366x768.png",
    description: "A beautiful aerial view of Clarkson University",
  },
  {
    title: "Plant 1 Bahr",
    image: "https://orascom.com/wp-content/uploads/Plant-1-Bahr-2.png",
    description: "A photo of Plant 1 Bahr",
  },
  {
    title: "DJI_0104",
    image: "https://orascom.com/wp-content/uploads/DJI_0104-0-e1687423876762-1366x768.jpg",
    description: "A beautiful photo taken by a drone",
  },
];

// SwiperCore.use([Navigation, Pagination]);

const Projects = () => {
  return (
    <Swiper
    //   navigation
    //   pagination={{ clickable: true }}
      loop={true}
      spaceBetween={30}
      slidesPerView={1}
      style={{ height: "100vh", width: "100vw" }}
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              color: "white",
              padding: "2rem",
            }}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Projects;
