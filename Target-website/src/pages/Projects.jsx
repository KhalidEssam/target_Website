import React, { useEffect, useState } from "react";
import DynamicComponent from "../components/DynamicComponent";

const Projects = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    fetch("/api/pages/name/targetprojects")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.sections) {
          setSections(data.sections);
        }
      })
      .catch((err) => console.error("Error fetching sections:", err));
  }, []);

  const handleCardClick = (section) => {
    setSelectedSection(section);
  };

  // Function to check if content is a valid JSON string
  const parseContent = (content) => {
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

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Projects</h1>

      {sections.length === 0 ? (
        <p className="text-center">Loading projects...</p>
      ) :  (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {sections.map((section, index) => {  
            const parsedContent = parseContent(section.content);
            // console.log(parsedContent);
            const {
              imageUrls = [],
              description = "No description available.",
              cost = "N/A",
            } = parsedContent.props || parsedContent;

            const firstImage = imageUrls.length > 0 ? imageUrls[0] : null;

            return section.isVisible ? (
              <div key={index} className="col">
                <div
                  className="card h-100 shadow-sm cursor-pointer"
                  onClick={() => handleCardClick(section)}
                >
                  {/* Cover Image */}
                  {firstImage && (
                    <img
                      src={firstImage}
                      alt={`Cover for ${section.name}`}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}

                  {/* Card Body */}
                  <div className="card-body">
                    <h5 className="card-title">{section.name}</h5>
                    <p className="card-text">
                      <strong>Description:</strong> {description}
                    </p>
                    <p className="card-text">
                      <strong>Evaluated Cost:</strong> ${cost}
                    </p>
                  </div>
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}

      {/* Render DynamicComponent when a section is selected */}
      {selectedSection && (
        <div className="mt-5">
          <DynamicComponent section={selectedSection} />
        </div>
      )}
    </div>
  );
};

export default Projects;
