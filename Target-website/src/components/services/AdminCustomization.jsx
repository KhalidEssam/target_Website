import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../hooks/useTranslation';
import PageList from './admin/PageList';
import PageForm from './admin/PageForm';
import SectionForm from './admin/SectionForm';
import SectionList from './admin/SectionList';
import './admin/AdminCustomization.css';

const AdminCustomization = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({
    name: '',
    type: 'text',
    content: { description: '' }
  });
  const [newPage, setNewPage] = useState({ name: '', slug: '' });
  const { translate: t } = useTranslation();

  // Fetch all pages from the backend
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/api/pages');
        if (!response.ok) throw new Error('Failed to fetch pages');
        const data = await response.json();
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };
    fetchPages();
  }, []);

  // Handle selecting a page
  const handlePageSelect = async (page) => {
    setSelectedPage(page);
    try {
      const response = await fetch(`/api/pages/${page.slug}`);
      if (!response.ok) throw new Error('Failed to fetch sections');
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  // Handle page form changes
  const handlePageInputChange = (field, value) => {
    setNewPage({ ...newPage, [field]: value });
  };

  // Handle section form changes
  const handleSectionInputChange = (field, value) => {
    if (field === 'description') {
      setNewSection({
        ...newSection,
        content: { ...newSection.content, [field]: value }
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
      content: { description: '' } // Reset content when type changes
    });
  };

  // Create a new page
  const handleCreatePage = async () => {
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPage),
      });

      if (response.ok) {
        const createdPage = await response.json();
        setPages([...pages, createdPage]);
        setNewPage({ name: '', slug: '' });
        alert(t('AdminCustom.success.createPage'));
      } else {
        alert(t('AdminCustom.error.createPage'));
      }
    } catch (error) {
      console.error('Error creating page:', error);
      alert(t('AdminCustom.error.createPage'));
    }
  };

  // Handle Update Section
  const handleUpdateSection = async (sectionId, isVisible) => {
    try {
      const response = await fetch(
        `/api/pages/${selectedPage.slug}/sections/${sectionId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...sections.find((sec) => sec._id === sectionId),
            isVisible
          }),
        }
      );

      if (response.ok) {
        setSections(
          sections.map((sec) =>
            sec._id === sectionId ? { ...sec, isVisible } : sec
          )
        );
        alert(t('AdminCustom.success.updateSection'));
      } else {
        alert(t('AdminCustom.error.updateSection'));
      }
    } catch (error) {
      console.error('Error updating section:', error);
      alert(t('AdminCustom.error.updateSection'));
    }
  };

  // Add new section
  const handleAddSection = async () => {
    if (!selectedPage) {
      alert(t('AdminCustom.error.selectPage'));
      return;
    }

    try {
      const response = await fetch(`/api/pages/${selectedPage.slug}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSection),
      });

      if (response.ok) {
        const addedSection = await response.json();
        setSections([...sections, addedSection]);
        setNewSection({ name: '', type: 'text', content: { description: '' } });
        alert(t('AdminCustom.success.addSection'));
      } else {
        alert(t('AdminCustom.error.addSection'));
      }
    } catch (error) {
      console.error('Error adding section:', error);
      alert(t('AdminCustom.error.addSection'));
    }
  };

  return (
    <div className="admin-customization">
      <h1 className="admin-title">{t('AdminCustom.title')}</h1>

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


// export default AdminCustomization;
//             />
//           </div>

//           {/* Metadata */}
//           <div className="form-group">
//             <label>Evaluated Cost ($)</label>
//             <input
//               type="number"
//               placeholder="Enter cost estimation"
//               value={newSection.content?.metadata?.cost || ""}
//               onChange={(e) =>
//                 setNewSection({
//                   ...newSection,
//                   content: {
//                     ...newSection.content,
//                     metadata: {
//                       ...newSection.content?.metadata,
//                       cost: e.target.value,
//                     },
//                   },
//                 })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>General Info</label>
//             <textarea
//               rows="2"
//               placeholder="Enter general information"
//               value={newSection.content?.metadata?.generalInfo || ""}
//               onChange={(e) =>
//                 setNewSection({
//                   ...newSection,
//                   content: {
//                     ...newSection.content,
//                     metadata: {
//                       ...newSection.content?.metadata,
//                       generalInfo: e.target.value,
//                     },
//                   },
//                 })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>Date</label>
//             <input
//               type="date"
//               value={newSection.content?.metadata?.date || ""}
//               onChange={(e) =>
//                 setNewSection({
//                   ...newSection,
//                   content: {
//                     ...newSection.content,
//                     metadata: {
//                       ...newSection.content?.metadata,
//                       date: e.target.value,
//                     },
//                   },
//                 })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>Sector</label>
//             <input
//               type="text"
//               placeholder="Enter sector information"
//               value={newSection.content?.metadata?.sector || ""}
//               onChange={(e) =>
//                 setNewSection({
//                   ...newSection,
//                   content: {
//                     ...newSection.content,
//                     metadata: {
//                       ...newSection.content?.metadata,
//                       sector: e.target.value,
//                     },
//                   },
//                 })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>Client</label>
//             <input
//               type="text"
//               placeholder="Enter client information"
//               value={newSection.content?.metadata?.client || ""}
//               onChange={(e) =>
//                 setNewSection({
//                   ...newSection,
//                   content: {
//                     ...newSection.content,
//                     metadata: {
//                       ...newSection.content?.metadata,
//                       client: e.target.value,
//                     },
//                   },
//                 })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               rows="2"
//               placeholder="Enter description"
//               value={newSection.content?.metadata?.description || ""}
//               onChange={(e) =>
//                 setNewSection({
//                   ...newSection,
//                   content: {
//                     ...newSection.content,
//                     metadata: {
//                       ...newSection.content?.metadata,
//                       description: e.target.value,
//                     },
//                   },
//                 })
//               }
//             />
//           </div>

//           {/* Dynamic Content Inputs Based on Section Type */}
//           <div className="form-group">
//             {newSection.type === "text" && (
//               <div>
//                 <label>Text Content</label>
//                 <textarea
//                   rows="5"
//                   placeholder="Enter text content"
//                   value={newSection.content?.text || ""}
//                   onChange={(e) =>
//                     setNewSection({
//                       ...newSection,
//                       content: { ...newSection.content, text: e.target.value },
//                     })
//                   }
//                 />
//               </div>
//             )}

//             {newSection.type === "image" && (
//               <div>
//                 <label>Image URL</label>
//                 <input
//                   type="text"
//                   placeholder="Enter image URL"
//                   value={newSection.content?.imageUrl || ""}
//                   onChange={(e) =>
//                     setNewSection({
//                       ...newSection,
//                       content: {
//                         ...newSection.content,
//                         imageUrl: e.target.value,
//                       },
//                     })
//                   }
//                 />
//               </div>
//             )}

//             {newSection.type === "slider" && (
//               <div>
//                 <label>Slider Component Name</label>
//                 <input
//                   type="text"
//                   placeholder="Enter component name (e.g., SwiperGallery)"
//                   value={newSection.content?.component || ""}
//                   onChange={(e) =>
//                     setNewSection({
//                       ...newSection,
//                       content: {
//                         ...newSection.content,
//                         component: e.target.value,
//                       },
//                     })
//                   }
//                 />
//                 <ImageUploader
//                   UserID={currentUserID}
//                   onImagesSelected={(images) =>
//                     setNewSection((prev) => ({
//                       ...prev,
//                       content: { ...prev.content, imageUrls: images },
//                     }))
//                   }
//                 />

//                 <label>Slider Images</label>
//                 <textarea
//                   rows="5"
//                   placeholder="Enter image URLs separated by commas"
//                   value={newSection.content?.imageUrls?.join(", ") || ""}
//                   onChange={(e) =>
//                     setNewSection((prev) => ({
//                       ...prev,
//                       content: {
//                         ...prev.content,
//                         imageUrls: e.target.value
//                           .split(",")
//                           .map((url) => url.trim()),
//                       },
//                     }))
//                   }
//                 />
//                 <label>Available Options (Comma-separated)</label>
//                 <input
//                   type="text"
//                   placeholder="Enter slider options (e.g., loop, autoplay)"
//                   value={newSection.content?.options?.join(", ") || ""}
//                   onChange={(e) =>
//                     setNewSection({
//                       ...newSection,
//                       content: {
//                         ...newSection.content,
//                         options: e.target.value
//                           .split(",")
//                           .map((opt) => opt.trim()),
//                       },
//                     })
//                   }
//                 />
//               </div>
//             )}
//           </div>

//           {/* Add Section Button */}
//           <button className="btn-primary" onClick={handleAddSection}>
//             {t("AdminCustom.addSection")}
//           </button>

//           {/* Debugging - JSON Output */}
//           <pre>{JSON.stringify(newSection, null, 2)}</pre>
//         </div>
//       )}

//       {/* Display Sections of Selected Page */}
//       {selectedPage && (
//         <div className="sections-list card">
//           <h2>
//             {t("AdminCustom.sections")} of {selectedPage.name}
//           </h2>

//           {sections.map((section) => {
//             // Ensure content is properly structured
//             const {
//               description,
//               cost,
//               date,
//               generalInfo,
//               text,
//               imageUrl,
//               imageUrls,
//               component,
//               options,
//             } = section.content || {};

//             return (
//               <div key={section._id} className="section-item">
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={section.isVisible}
//                     onChange={() =>
//                       handleUpdateSection(section._id, !section.isVisible)
//                     }
//                   />
//                   Visible
//                 </label>
//                 <h3>{section.name}</h3>
//                 <p>
//                   <strong>Type:</strong> {section.type}
//                 </p>
//                 <p>
//                   <strong>Description:</strong> {description || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Evaluated Cost:</strong> ${section.content?.metadata?.cost || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Date:</strong> {section.content?.metadata?.date || "N/A"}
//                 </p>
//                 <p>
//                   <strong>General Info:</strong> {section.content?.metadata?.generalInfo || "N/A"}
//                 </p>
//                 {/* Render content based on section type */}
//                 {section.type === "text" && (
//                   <p>
//                     <strong>Content:</strong> {text}
//                   </p>
//                 )}
//                 {section.type === "image" && imageUrl && (
//                   <div>
//                     <p>
//                       <strong>Image:</strong>
//                     </p>
//                     <img
//                       src={imageUrl}
//                       alt={section.name}
//                       style={{ width: "100%", maxWidth: "400px" }}
//                     />
//                   </div>
//                 )}
//                 {section.type === "slider" && imageUrls?.length > 0 && (
//                   <div>
//                     <p>
//                       <strong>Slider Component:</strong> {component}
//                     </p>
//                     <p>
//                       <strong>Available Options:</strong>{" "}
//                       {options?.join(", ") || "None"}
//                     </p>
//                     <div className="slider-preview">
//                       {imageUrls.map((url, index) => (
//                         <img
//                           key={index}
//                           src={url}
//                           alt={`Slide ${index + 1}`}
//                           style={{
//                             width: "80px",
//                             height: "80px",
//                             margin: "5px",
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

