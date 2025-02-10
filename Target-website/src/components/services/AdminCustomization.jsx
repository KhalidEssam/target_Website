import React, { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
// import "./AdminCustomization.css"; // Import a CSS file for styling

const AdminCustomization = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({
    name: "",
    type: "text",
    content: "",
  });
  const [newPage, setNewPage] = useState({ name: "", slug: "" });
  const { translate: t } = useTranslation();

  // Fetch all pages from the backend
  useEffect(() => {
    fetch("/api/pages")
      .then((response) => response.json())
      .then((data) => setPages(data))
      .catch((err) => console.error("Error fetching pages:", err));
  }, []);

  // Handle selecting a page
  const handlePageSelect = (page) => {
    setSelectedPage(page);
    fetch(`/api/pages/${page.slug}`)
      .then((response) => response.json())
      .then((data) => setSections(data))
      .catch((err) => console.error("Error fetching sections:", err));
  };

  // Create a new page
  const handleCreatePage = async () => {
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPage),
      });

      if (response.ok) {
        const createdPage = await response.json();
        setPages([...pages, createdPage]);
        setNewPage({ name: "", slug: "" });
        alert("Page created successfully!");
      } else {
        alert("Failed to create the page.");
      }
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  // Add a new section to a page
  const handleAddSection = async () => {
    if (!selectedPage) return alert("Please select a page first.");

    try {
      const response = await fetch(`/api/pages/${selectedPage.slug}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSection),
      });

      if (response.ok) {
        const addedSection = await response.json();
        setSections([...sections, addedSection]);
        setNewSection({ name: "", type: "text", content: "" });
        alert("Section added successfully!");
      } else {
        alert("Failed to add section.");
      }
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  return (
    <div className="admin-customization">
      <h1 className="admin-title">{t("AdminCustom.title")}</h1>

      {/* Create a New Page */}
      <div className="create-page card">
        <h2>{t("AdminCustom.createPage")}</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Page Name"
            value={newPage.name}
            onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Page Slug (e.g., projects)"
            value={newPage.slug}
            onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
          />
        </div>
        <button className="btn-primary" onClick={handleCreatePage}>
          {t("AdminCustom.createPage")}
        </button>
      </div>

      {/* List of Existing Pages */}
      <div className="pages-list card">
        <h2>{t("AdminCustom.pages")}</h2>
        <div className="page-buttons">
          {pages.length > 0 &&
            pages.map((page) => (
              <button
                key={page._id}
                onClick={() => handlePageSelect(page)}
                className={`page-btn ${
                  selectedPage?.slug === page.slug ? "selected" : ""
                }`}
              >
                {page.name}
              </button>
            ))}
        </div>
      </div>

      {/* Add Section */}
      {selectedPage && (
        <div className="add-section card">
          <h2>
            {t("AdminCustom.addSection")} to {selectedPage.name}
          </h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Section Name"
              value={newSection.name}
              onChange={(e) =>
                setNewSection({ ...newSection, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <select
              value={newSection.type}
              onChange={(e) =>
                setNewSection({ ...newSection, type: e.target.value })
              }
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="slider">Swiper Slider</option>
            </select>
          </div>
          <div className="form-group">
            <textarea
              rows="5"
              placeholder="Section Content (Valid JSON format)"
              value={newSection.content}
              onChange={(e) => {
                const inputValue = e.target.value;
                try {
                  // Attempt to parse the input as JSON
                  const parsedContent = JSON.parse(inputValue);
                  // Update the state only if the JSON is valid
                  setNewSection({ ...newSection, content: parsedContent });
                } catch (error) {
                  // If JSON is invalid, keep the raw input but show an error
                  setNewSection({ ...newSection, content: inputValue });
                }
              }}
              style={{
                border:
                  newSection.content && typeof newSection.content !== "object"
                    ? "2px solid red"
                    : "1px solid #ccc",
              }}
            />
            {newSection.content && typeof newSection.content !== "object" && (
              <p
                style={{ color: "red", fontSize: "0.875rem", marginTop: "5px" }}
              >
                Invalid JSON format. Please enter valid JSON.
              </p>
            )}
          </div>
          <button className="btn-primary" onClick={handleAddSection}>
            {t("AdminCustom.addSection")}
          </button>
        </div>
      )}

      {/* Display Sections of Selected Page */}
      {selectedPage && (
        <div className="sections-list card">
          <h2>
            {t("AdminCustom.sections")} of {selectedPage.name}
          </h2>
          {sections.map((section) => (
            <div key={section._id} className="section-item">
              <h3>{section.name}</h3>
              <p>Type: {section.type}</p>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCustomization;
