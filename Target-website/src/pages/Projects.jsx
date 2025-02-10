import React, { useEffect, useState } from "react";
import DynamicComponent from "../components/DynamicComponent";

const Projects = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    fetch("/api/pages/name/targetprojects") // Backend call
      .then((res) => res.json())
      .then((data) => {
        if (data && data.sections) {
          setSections(data.sections);
        }
      })
      .catch((err) => console.error("Error fetching sections:", err));
  }, []);

  // Handle card click
  const handleCardClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Projects</h1>

      {sections.length === 0 ? (
        <p className="text-center">Loading projects...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {sections.map((section, index) => {
            // Ensure section.content is an array
            const selectedSection = JSON.parse(section.content);


            // Extract the first image from the section content (if available)
            const firstImage = selectedSection.props.images[0]

            return (
              <div key={index} className="col">
                {/* {contentArray && console.log(JSON.parse(selectedSection))} */}
                <div
                  className="card h-100 shadow-sm cursor-pointer"
                  onClick={() => handleCardClick(section)}
                >
                  {/* Card Cover Image */}
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
                      {section.description || "No description available."}
                    </p>
                  </div>
                </div>
              </div>
            );
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