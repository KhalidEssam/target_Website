import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Utility function for file validation
const validateFile = (file) => {
  if (!file) {
    console.error("No file selected");
    return false;
  }
  if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
    console.error("Unsupported file type");
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    console.error("File size exceeds 5MB");
    return false;
  }
  return true;
};

// Swiper Component for Item Images
const ItemSwiper = ({ images, itemType }) => {
  const direction = useSelector((state) => state.language.direction);

  return (
    <Swiper
      key={direction} // Re-initialize Swiper on direction change
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      style={{
        height: "300px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="mySwiper"
    >
      {images.map((url, idx) => (
        <SwiperSlide key={idx}>
          <img src={url} alt={itemType} style={{ width: "100%", height: "auto" }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// Generate DataGrid Columns and Rows
const generateDataGridData = (items) => {
  if (!items?.length) return { columns: [], rows: [] };

  const columns = Object.keys(items[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    width: key === "description" ? 300 : 200,
    ...(key === "imageUrls" && {
      renderCell: (params) =>
        params.value?.length ? (
          <a href={params.value[0]} target="_blank" rel="noopener noreferrer">
            <img
              src={params.value[0]}
              alt="Item"
              style={{ width: 80, height: 80, objectFit: "contain" }}
            />
          </a>
        ) : (
          "No Image"
        ),
    }),
  }));

  const rows = items.map((item) => ({
    id: item._id ? item._id.toString() : "",
    ...item,
  }));

  return { columns, rows };
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const swiperRef = useRef(null);
  const direction = useSelector((state) => state.language.direction);

  // Fetch Order Data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        const data = await response.json();
        setOrder(data || {});
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [id]);

  // Handle Image Upload
  const handleBrowseImage = async (e, itemId) => {
    const file = e.target?.files?.[0];
    if (!validateFile(file)) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("itemId", itemId);

    try {
      const response = await fetch("/api/upload-single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setOrder((prevOrder) => ({
        ...prevOrder,
        items: prevOrder.items.map((item) =>
          item._id === itemId
            ? { ...item, imageUrls: [...(item.imageUrls || []), data.imageUrl] }
            : item
        ),
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle Order Update
  const handleUpdateOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        alert("Order updated successfully");
        navigate("/profile/orders");
      } else {
        alert("Error updating order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order");
    }
  };

  // Handle Order Deletion
  const handleDeleteOrder = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Order deleted successfully");
        navigate("/profile/orders");
      } else {
        alert("Error deleting order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  if (!order) return <p>Loading...</p>;

  const { columns, rows } = generateDataGridData(order.items);

  return (
    <>
      <h1>Order Details</h1>
      <p>Description: {order.description}</p>
      <p>Admin ID: {order.adminId}</p>
      <p>Party ID: {order.partyId}</p>

      {/* Data Grid Table */}
      <div style={{ height: 400, width: "100%", marginBottom: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
        />
      </div>

      {/* Items Section */}
      {order.items?.map((item) => (
        <div key={item._id}>
          <p>Item: {item.type}</p>
          {item.imageUrls?.length > 0 ? (
            <ItemSwiper images={item.imageUrls} itemType={item.type} />
          ) : (
            <p>No images available</p>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleBrowseImage(e, item._id)}
          />
        </div>
      ))}

      {/* Order Controls */}
      <Input
        type="select"
        name="status"
        id="status"
        value={order.status}
        onChange={(e) => setOrder({ ...order, status: e.target.value })}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </Input>

      <Input
        type="text"
        value={order.description}
        onChange={(e) => setOrder({ ...order, description: e.target.value })}
      />

      <Button
        color="success"
        onClick={() =>
          setOrder((prevOrder) => ({
            ...prevOrder,
            items: [
              ...prevOrder.items,
              { type: "", description: "", imageUrls: [] },
            ],
          }))
        }
      >
        Add Item
      </Button>

      {order.items.map((item, idx) => (
        <div key={idx}>
          <p>Item: {item.type}</p>
          <Input
            type="select"
            value={item.type}
            onChange={(e) =>
              setOrder((prevOrder) => ({
                ...prevOrder,
                items: prevOrder.items.map((i, index) =>
                  idx === index ? { ...i, type: e.target.value } : i
                ),
              }))
            }
          >
            <option value="vehicle">Vehicle</option>
            <option value="equipment">Equipment</option>
          </Input>
          <Input
            type="text"
            value={item.description}
            onChange={(e) =>
              setOrder((prevOrder) => ({
                ...prevOrder,
                items: prevOrder.items.map((i, index) =>
                  idx === index ? { ...i, description: e.target.value } : i
                ),
              }))
            }
          />
        </div>
      ))}

      <Button color="primary" onClick={handleUpdateOrder}>
        Update Order
      </Button>
      <Button color="danger" onClick={handleDeleteOrder}>
        Delete Order
      </Button>
    </>
  );
};

export default OrderDetail;