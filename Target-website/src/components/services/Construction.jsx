import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const ConstructionServicePage = () => {
  const [projectId, setProjectId] = useState('');
  const [constructionData, setConstructionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.token.accessToken);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) {
      setError('Please enter a project ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch project details.');
      }
      const data = await response.json();
      setConstructionData(data);
    } catch (err) {
      setError(err.message);
      setConstructionData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="construction-service-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Building Your Dreams, One Brick at a Time</h1>
          <p>Expert construction services tailored to your needs.</p>
          <button className="cta-button">Get a Free Quote</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-sectionX ">
        <h2>Our Services</h2>
        <div className="services-grid d-block d-md-flex justify-content-center overflow-scroll">
          <div className="service-card">
            <h3>Residential Construction</h3>
            <p>We build homes that stand the test of time.</p>
          </div>
          <div className="service-card">
            <h3>Commercial Construction</h3>
            <p>Creating spaces for businesses to thrive.</p>
          </div>
          <div className="service-card d-block">
            <h3>Renovation & Remodeling</h3>
            <p>Transforming your space into something extraordinary.</p>
          </div>
        </div>
      </section>

      {/* Dynamic Section - Fetch Project by ID */}
      <section className="dynamic-section">
        <h2>Featured Project</h2>
        <form onSubmit={handleSubmit} className="project-form">
          <input
            type="text"
            placeholder="Enter Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Project'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {constructionData && (
          <div className="project-details">
            <h3>{constructionData.projectName}</h3>
            <p>{constructionData.description}</p>
            <img src={constructionData.imageUrl} alt={constructionData.projectName} />
            <p><strong>Location:</strong> {constructionData.location}</p>
            <p><strong>Completion Date:</strong> {constructionData.completionDate}</p>
          </div>
        )}
      </section>

    
    </div>
  );
};

export default ConstructionServicePage;