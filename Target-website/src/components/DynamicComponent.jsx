import React from "react";
import Card from "./Card";
import SwiperGallery from "./SwiperGallery";

const Component = ({ section }) => {
  if (!section.isVisible) return null; // Hide if not visible

  const parseContent  = (content) => {
    if (typeof content === "object" && content !== null) {
      return content; // Already an object, return as is
    }
    try {
      return JSON.parse(content); // Attempt to parse if it's a string
    } catch (error) {
      console.error("Error parsing section content:", error);
      return {}; // Return an empty object on failure
    }
  };
  const jsonSection = parseContent(section.content);

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
      return <SwiperGallery content={jsonSection} />; // Pass array of images

    default:
      return <p>Unknown section type</p>;
  }
};

export default Component;
