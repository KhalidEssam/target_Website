import { Route, Routes } from "react-router-dom";
import BrowseOrderByPhoneNumber from "../components/services/BrowseOrderByPhoneNumber";
import ShowAvailableSupplies from "../components/services/Supplies";
import { useState , useEffect } from "react";

import { useTranslation } from "../hooks/useTranslation";


const Services = () => {
  const [supplies, setSupplies] = useState([]);
  const { translate : t } = useTranslation();

  const fetchSupplies = async () => {
    try {
      const response = await fetch("/api/orderItems");
      const data = await response.json();
      if (!response.ok) {
        console.error("Error fetching supplies:", data.error);
        return [];
      }

      setSupplies(data);
    } catch (error) {
      console.error("Error fetching supplies:", error);
      return [];
    }
  };
  useEffect(() => {
    fetchSupplies();
  }, []);

    const availableServices = [
      {
        name: "Maintenance",
        route: "maintenance",
        component: BrowseOrderByPhoneNumber,
      },
      {
        name: "Supplies",
        route: "supplies",
        component: ShowAvailableSupplies ,
        param: { supplies },
      },
    ];




  return (
    <>
      <h1>{t("navbar.services")}</h1>

      <Routes>
        {availableServices.map((service) => (
          <Route
            key={service.name}
            path={service.route}
            element={<service.component {...service.param} />}
          />
        ))}
      </Routes>

    </>
  );
};

export default Services;
