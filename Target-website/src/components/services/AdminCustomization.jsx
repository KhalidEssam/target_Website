import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../../hooks/useTranslation";
import PageList from "./admin/PageList";
import PageForm from "./admin/PageForm";
import SectionForm from "./admin/SectionForm";
import SectionList from "./admin/SectionList";
import "./admin/AdminCustomization.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminCustomization = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({
    name: "",
    type: "text",
    content: { description: "" },
  });
  const [newPage, setNewPage] = useState({ name: "", slug: "" });
  const { translate: t } = useTranslation();
  const token = useSelector((state) => state.token.accessToken);

  // Fetch all pages from the backend
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch("/api/pages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch pages");
        const data = await response.json();
        setPages(data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchPages();
  }, []);

  // Handle selecting a page
  const handlePageSelect = async (page) => {
    setSelectedPage(page);
    try {
      const response = await fetch(`/api/pages/${page.slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch sections");
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  // Handle page form changes
  const handlePageInputChange = (field, value) => {
    setNewPage({ ...newPage, [field]: value });
  };

  // Handle section form changes
  const handleSectionInputChange = (field, value) => {
    if (field === "description") {
      setNewSection({
        ...newSection,
        content: { ...newSection.content, [field]: value },
      });
    } else {
      setNewSection({ ...newSection, [field]: value });
    }
  };

  // Handle section type change
  const handleSectionTypeChange = (value) => {
    setNewSection({
      ...newSection,
      type: value,
      content: { description: "" }, // Reset content when type changes
    });
  };

  // Create a new page
  const handleCreatePage = async () => {
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPage),
      });

      if (response.ok) {
        const createdPage = await response.json();
        setPages([...pages, createdPage]);
        setNewPage({ name: "", slug: "" });
        toast.success(t("AdminCustom.success.createPage"));
      } else {
        toast.error(t("AdminCustom.error.createPage"));
      }
    } catch (error) {
      console.error("Error creating page:", error);
      toast.error(t("AdminCustom.error.createPage"));
    }
  };

  // Handle Update Section
  const handleUpdateSection = async (sectionId, isVisible) => {
    try {
      const response = await fetch(
        `/api/pages/${selectedPage.slug}/sections/${sectionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...sections.find((sec) => sec._id === sectionId),
            isVisible,
          }),
        }
      );

      if (response.ok) {
        setSections(
          sections.map((sec) =>
            sec._id === sectionId ? { ...sec, isVisible } : sec
          )
        );
        toast.success(t("AdminCustom.success.updateSection"));
      } else {
        toast.error(t("AdminCustom.error.updateSection"));
      }
    } catch (error) {
      console.error("Error updating section:", error);
      toast.error(t("AdminCustom.error.updateSection"));
    }
  };

  // Add new section
  const handleAddSection = async () => {
    if (!selectedPage) {
      toast.error(t("AdminCustom.error.selectPage"));
      return;
    }

    try {
      const response = await fetch(`/api/pages/${selectedPage.slug}/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSection),
      });

      if (response.ok) {
        const addedSection = await response.json();
        setSections([...sections, addedSection]);
        setNewSection({ name: "", type: "text", content: { description: "" } });
        toast.success(t("AdminCustom.success.addSection"));
      } else {
        toast.error(t("AdminCustom.error.addSection"));
      }
    } catch (error) {
      console.error("Error adding section:", error);
      toast.error(t("AdminCustom.error.addSection"));
    }
  };

  return (
    <div
      className="admin-customization"
      style={{ color: isDarkMode ? "white" : "black" }}
    >
      <h1 className="admin-title">{t("AdminCustom.title")}</h1>

      <div className="admin-grid">
        <div className="admin-column">
          <PageForm
            page={newPage}
            onInputChange={handlePageInputChange}
            onSubmit={handleCreatePage}
          />

          <PageList
            pages={pages}
            selectedPage={selectedPage}
            onPageSelect={handlePageSelect}
          />
        </div>

        {selectedPage && (
          <div className="admin-column">
            <SectionForm
              section={newSection}
              onInputChange={handleSectionInputChange}
              onTypeChange={handleSectionTypeChange}
              onSubmit={handleAddSection}
            />

            <SectionList
              sections={sections}
              onUpdateSection={handleUpdateSection}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomization;
