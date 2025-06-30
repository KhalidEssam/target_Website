import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import { useTranslation } from '../../hooks/useTranslation';

const BrowseMaintenancePlans = () => {
  const { translate: t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [parties, setParties] = useState([]);

  const fetchPartyOrganizations = async () => {
    try {
      const response = await fetch("/api/parties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setParties(data || []);
    } catch (error) {
      console.error("Error fetching party organizations:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setOrders(data || []);
      setFilteredOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchPartyOrganizations();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredOrders(orders); // Reset to all orders
      return;
    }

    const filtered = orders.filter(order => {
      const party = parties.find(p => p._id === order.partyId);
      return (
        (party?.name?.toLowerCase().includes(query)) || // Match by name
        (party?.phoneNumber?.toLowerCase().includes(query)) // Match by phone number
      );
    });

    setFilteredOrders(filtered);
  };

  return (
    <>
      <h1>{t('browseOrders.title')}</h1>
      <Input
        type="text"
        name="search"
        id="search"
        placeholder={t('browseOrders.searchPlaceholder')}
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="card-container ">
        {filteredOrders.map((order, index) => {
          const party = parties.find(p => p._id === order.partyId);
          return (
            <div className="card m-2" key={index} onClick={() => window.location.href = window.location + `/${order._id}`} >
              <p>{order.description}</p>
              <p>{order.adminId ? t('browseOrders.adminId') + order.adminId : t('browseOrders.noAdmin')}</p>
              <p>{party ? t('browseOrders.partyName') + party.name : t('browseOrders.noParty')}</p>
              <p>{party?.phoneNumber ? t('browseOrders.phone') + party.phoneNumber : t('browseOrders.noPhone')}</p>
              <p>{t('browseOrders.itemIds')} {order.items.map(item => item._id).join(', ')}</p>
              <p>{t('browseOrders.itemTypes')} {order.items.map(item => item.type).join(', ')}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BrowseMaintenancePlans;