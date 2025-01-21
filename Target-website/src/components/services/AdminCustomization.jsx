import React, { useState, useEffect } from "react";

const AdminCustomization = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [content, setContent] = useState("");

  // Fetch existing sections from the backend
  useEffect(() => {
    fetch("/api/sections")
      .then((response) => response.json())
      .then((data) => setSections(data))
      .catch((err) => console.error("Error fetching sections:", err));
  }, []);

  // Handle section selection
  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setContent(section.content || "");
  };

  // Save updated content
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/sections/${selectedSection.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const updatedSection = await response.json();
        setSections((prev) =>
          prev.map((s) => (s.id === updatedSection.id ? updatedSection : s))
        );
        alert("Section updated successfully!");
      } else {
        alert("Failed to update the section.");
      }
    } catch (error) {
      console.error("Error saving section:", error);
    }
  };

  return (
    <div className="admin-customization">
      <h1>Page Customization</h1>

      {/* Section List */}
      <div className="sections-list">
        <h2>Available Sections</h2>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionSelect(section)}
            className={
              selectedSection?.id === section.id ? "selected" : "section-btn"
            }
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Content Editor */}
      {selectedSection && (
        <div className="editor">
          <h2>Edit Section: {selectedSection.name}</h2>
          <textarea
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default AdminCustomization;
