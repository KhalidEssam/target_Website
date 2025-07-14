import React, { useState } from 'react';
import { useTranslation } from "../../../hooks/useTranslation";
import { useSelector } from 'react-redux';

const SupplySearch = ({ supplies, setSupplyData }) => {
  const [supplyId, setSupplyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { translate: t } = useTranslation();
  const token = useSelector((state) => state.token.accessToken);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supplyId) {
      setError('Please enter a supply ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${supplyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch supply details.');
      }
      const data = await response.json();
      setSupplyData(data);
    } catch (err) {
      setError(err.message);
      setSupplyData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="supply-input-section">
      <h2>{t("Supplies.fetchSupplyDetails")}</h2>
      <form onSubmit={handleSubmit} className="supply-form">
        <input
          type="text"
          placeholder={t("Supplies.enterSupplyID")}
          value={supplyId}
          onChange={(e) => setSupplyId(e.target.value)}
          required
        />
       <button type="submit" disabled={loading}>
        {loading ? t("Supplies.fetching") : t("Supplies.fetch")}
      </button>

      </form>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default SupplySearch;
