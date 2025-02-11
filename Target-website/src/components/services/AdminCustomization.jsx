import React, { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
// import "./AdminCustomization.css"; // Import a CSS file for styling
import ImageUploader from "../imageUploader";
import { useSelector } from "react-redux";

const AdminCustomization = () => {
  const [pages, setPages] = useState([]);
  const currentUserID = useSelector((state) => state.user.userInfo.sub);
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
  // Handle Update Section
  const handleUpdateSection = async (sectionId, isVisible) => {
    try {
      const response = await fetch(
        `/api/pages/${selectedPage.slug}/sections/${sectionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sections.find((sec) => sec._id === sectionId), isVisible }),
        }
      );

      if (response.ok) {
        setSections(
          sections.map((sec) =>
            sec._id === sectionId ? { ...sec, isVisible } : sec
          )
        );
        alert("Section visibility updated successfully!");
      } else {
        alert("Failed to update section visibility.");
      }
    } catch (error) {
      console.error("Error updating section visibility:", error);
    }
  };

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
        setNewSection({ name: "", type: "text", content: {} }); // Reset the form
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

          {/* Section Name */}
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

          {/* Section Type */}
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

          {/* Description (For All Section Types) */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              placeholder="Enter section description"
              value={newSection.content?.description || ""}
              onChange={(e) =>
                setNewSection({
                  ...newSection,
                  content: {
                    ...newSection.content,
                    description: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* Metadata */}
          <div className="form-group">
            <label>Evaluated Cost ($)</label>
            <input
              type="number"
              placeholder="Enter cost estimation"
              value={newSection.content?.metadata?.cost || ""}
              onChange={(e) =>
                setNewSection({
                  ...newSection,
                  content: {
                    ...newSection.content,
                    metadata: {
                      ...newSection.content?.metadata,
                      cost: e.target.value,
                    },
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label>General Info</label>
            <textarea
              rows="2"
              placeholder="Enter general information"
              value={newSection.content?.metadata?.generalInfo || ""}
              onChange={(e) =>
                setNewSection({
                  ...newSection,
                  content: {
                    ...newSection.content,
                    metadata: {
                      ...newSection.content?.metadata,
                      generalInfo: e.target.value,
                    },
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={newSection.content?.metadata?.date || ""}
              onChange={(e) =>
                setNewSection({
                  ...newSection,
                  content: {
                    ...newSection.content,
                    metadata: {
                      ...newSection.content?.metadata,
                      date: e.target.value,
                    },
                  },
                })
              }
            />
          </div>

          {/* Dynamic Content Inputs Based on Section Type */}
          <div className="form-group">
            {newSection.type === "text" && (
              <div>
                <label>Text Content</label>
                <textarea
                  rows="5"
                  placeholder="Enter text content"
                  value={newSection.content?.text || ""}
                  onChange={(e) =>
                    setNewSection({
                      ...newSection,
                      content: { ...newSection.content, text: e.target.value },
                    })
                  }
                />
              </div>
            )}

            {newSection.type === "image" && (
              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={newSection.content?.imageUrl || ""}
                  onChange={(e) =>
                    setNewSection({
                      ...newSection,
                      content: {
                        ...newSection.content,
                        imageUrl: e.target.value,
                      },
                    })
                  }
                />
              </div>
            )}

            {newSection.type === "slider" && (
              <div>
                <label>Slider Component Name</label>
                <input
                  type="text"
                  placeholder="Enter component name (e.g., SwiperGallery)"
                  value={newSection.content?.component || ""}
                  onChange={(e) =>
                    setNewSection({
                      ...newSection,
                      content: {
                        ...newSection.content,
                        component: e.target.value,
                      },
                    })
                  }
                />
                <ImageUploader
                  UserID={currentUserID}
                  onImagesSelected={(images) =>
                    setNewSection((prev) => ({
                      ...prev,
                      content: { ...prev.content, imageUrls: images },
                    }))
                  }
                />

                <label>Slider Images</label>
                <textarea
                  rows="5"
                  placeholder="Enter image URLs separated by commas"
                  value={newSection.content?.imageUrls?.join(", ") || ""}
                  onChange={(e) =>
                    setNewSection((prev) => ({
                      ...prev,
                      content: {
                        ...prev.content,
                        imageUrls: e.target.value
                          .split(",")
                          .map((url) => url.trim()),
                      },
                    }))
                  }
                />
                <label>Available Options (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Enter slider options (e.g., loop, autoplay)"
                  value={newSection.content?.options?.join(", ") || ""}
                  onChange={(e) =>
                    setNewSection({
                      ...newSection,
                      content: {
                        ...newSection.content,
                        options: e.target.value
                          .split(",")
                          .map((opt) => opt.trim()),
                      },
                    })
                  }
                />
              </div>
            )}
          </div>

          {/* Add Section Button */}
          <button className="btn-primary" onClick={handleAddSection}>
            {t("AdminCustom.addSection")}
          </button>

          {/* Debugging - JSON Output */}
          <pre>{JSON.stringify(newSection, null, 2)}</pre>
        </div>
      )}

      {/* Display Sections of Selected Page */}
      {selectedPage && (
        <div className="sections-list card">
          <h2>
            {t("AdminCustom.sections")} of {selectedPage.name}
          </h2>

          {sections.map((section) => {
            // Ensure content is properly structured
            const {
              description,
              cost,
              date,
              generalInfo,
              text,
              imageUrl,
              imageUrls,
              component,
              options,
            } = section.content || {};

            return (
              <div key={section._id} className="section-item">
                <label>
                  <input
                    type="checkbox"
                    checked={section.isVisible}
                    onChange={() =>
                      handleUpdateSection(section._id, !section.isVisible)
                    }
                  />
                  Visible
                </label>
                <h3>{section.name}</h3>
                <p>
                  <strong>Type:</strong> {section.type}
                </p>
                <p>
                  <strong>Description:</strong> {description || "N/A"}
                </p>
                <p>
                  <strong>Evaluated Cost:</strong> ${cost || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong> {date || "N/A"}
                </p>
                <p>
                  <strong>General Info:</strong> {generalInfo || "N/A"}
                </p>
                {/* Render content based on section type */}
                {section.type === "text" && (
                  <p>
                    <strong>Content:</strong> {text}
                  </p>
                )}
                {section.type === "image" && imageUrl && (
                  <div>
                    <p>
                      <strong>Image:</strong>
                    </p>
                    <img
                      src={imageUrl}
                      alt={section.name}
                      style={{ width: "100%", maxWidth: "400px" }}
                    />
                  </div>
                )}
                {section.type === "slider" && imageUrls?.length > 0 && (
                  <div>
                    <p>
                      <strong>Slider Component:</strong> {component}
                    </p>
                    <p>
                      <strong>Available Options:</strong>{" "}
                      {options?.join(", ") || "None"}
                    </p>
                    <div className="slider-preview">
                      {imageUrls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Slide ${index + 1}`}
                          style={{
                            width: "80px",
                            height: "80px",
                            margin: "5px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminCustomization;
