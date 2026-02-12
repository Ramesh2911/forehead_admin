import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  FaIdBadge,
  FaUser,
  FaPhoneAlt,
  FaStore,
  FaMapMarkerAlt,
  FaCity,
  FaLayerGroup,
  FaCheckCircle,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";
import { getRetailerDetails } from "../../services/auth.api";

const RetailerDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  const [retailer, setRetailer] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =======================
     LOCK PAGE SCROLL
  ======================= */
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (id) fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await getRetailerDetails(id);
      const result = res.data;

      if (result.success) {
        setRetailer(result.data);
      } else {
        setRetailer(null);
      }
    } catch (error) {
      console.error(error);
      setRetailer(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (!retailer) return <p style={styles.loading}>No Retailer Found</p>;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2 style={styles.heading}>
          <span style={styles.retailer}>Retailer</span>{" "}
          <span style={styles.details}>Details</span>
        </h2>
      </div>

      <div style={styles.card}>
        <Detail icon={<FaIdBadge />} label="Retailer ID" value={retailer.retailerId} />
        <Detail icon={<FaStore />} label="Shop Name" value={retailer.shop_name} />
        <Detail icon={<FaLayerGroup />} label="Shop Type" value={retailer.shop_type_name} />

        <Detail icon={<FaUser />} label="Owner Name" value={retailer.name} />
        <Detail icon={<FaPhoneAlt />} label="Phone" value={retailer.phone} />

        <Detail icon={<FaCheckCircle />} label="Status" value={retailer.status} />

        <Detail
          icon={retailer.is_verified ? <FaCheckCircle /> : <FaClock />}
          label="Verification"
          value={retailer.is_verified ? "Approved" : "Pending"}
        />

        <Detail icon={<FaMapMarkerAlt />} label="State" value={retailer.state_name} />
        <Detail icon={<FaCity />} label="District" value={retailer.district_name} />
        <Detail icon={<FaCity />} label="City" value={retailer.city_name} />

        <Detail
          icon={<FaMapMarkerAlt />}
          label="Address"
          value={retailer.address || "-"}
        />

        <Detail
          label="Register Date & Time"
          value={new Date(retailer.created_at).toLocaleString()}
        />
      </div>
    </div>
  );
};

const Detail = ({ icon, label, value }) => (
  <div style={styles.item}>
    {icon && <div style={styles.icon}>{icon}</div>}
    <div>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{value}</div>
    </div>
  </div>
);

const styles = {
  page: {
    height: "100vh",
    background: "#f4f6fb",
    padding: "24px 32px",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  backBtn: {
    border: "none",
    background: "#fff",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: 600,
    fontSize: "22px",
  },

  retailer: {
    color: "#1e40af",
  },

  details: {
    color: "#dc2626",
  },

  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  item: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  icon: {
    fontSize: "18px",
    color: "#1e40af",
    marginTop: "4px",
  },
  label: {
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: 500,
  },
  value: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#111827",
    wordBreak: "break-word",
  },
  loading: {
    padding: "40px",
    textAlign: "center",
  },
};

export default RetailerDetails;
