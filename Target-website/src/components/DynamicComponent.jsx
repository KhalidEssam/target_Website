import React from "react";
import Card from "./Card";
import SwiperGallery from "./SwiperGallery";

const Component = ({ section }) => {
  if (!section.isVisible) return null; // Hide if not visible

  const jsonSection = JSON.parse(section.content);

  switch (section.type) {
    case "text":
      return <p>{jsonSection ? jsonSection.text : "No text available."}</p>;

    case "image":
      return (
        <Card
          title={section.name}
          image={section.content} // URL
          description="Project Image"
        />
      );

    case "slider":
      return <SwiperGallery content={JSON.parse(section.content)} />; // Pass array of images

    default:
      return <p>Unknown section type</p>;
  }
};

export default Component;
