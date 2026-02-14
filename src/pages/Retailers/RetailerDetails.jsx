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

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import { getRetailerDetails } from "../../services/auth.api";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const RetailerDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  const [retailer, setRetailer] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const hasLocation =
    retailer.latitude && retailer.longitude;

  const lat = hasLocation ? parseFloat(retailer.latitude) : null;
  const lng = hasLocation ? parseFloat(retailer.longitude) : null;

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
        <Detail icon={<FaMapMarkerAlt />} label="Police Station" value={retailer.station_name} />
        <Detail icon={<FaMapMarkerAlt />} label="PIN Code" value={retailer.pin} />
        <Detail icon={<FaMapMarkerAlt />} label="Address" value={retailer.address} />

        <Detail
          label="Register Date & Time"
          value={new Date(retailer.created_at).toLocaleString()}
        />

        {/* MAP SECTION */}
        {hasLocation ? (
          <div style={styles.mapWrapper}>
            <div style={styles.mapTitle}>Shop Location</div>

            <MapContainer
              center={[lat, lng]}
              zoom={15}
              style={styles.map}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[lat, lng]}>
                {/* Hover Tooltip */}
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <div style={{ fontSize: "13px" }}>
                    <strong>{retailer.shop_name}</strong>
                    <br />
                    {retailer.address}
                    <br />
                    <span style={{ color: "#2563eb" }}>
                      Lat: {retailer.latitude}
                    </span>
                    <br />
                    <span style={{ color: "#dc2626" }}>
                      Lng: {retailer.longitude}
                    </span>
                  </div>
                </Tooltip>

                {/* Click Popup */}
                <Popup>
                  <strong>{retailer.shop_name}</strong>
                  <br />
                  {retailer.address}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <div style={styles.noLocation}>
            Location not available
          </div>
        )}
      </div>
    </div>
  );
};

const Detail = ({ icon, label, value }) => (
  <div style={styles.item}>
    {icon && <div style={styles.icon}>{icon}</div>}
    <div>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{value || "-"}</div>
    </div>
  </div>
);

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb",
    padding: "24px 32px",
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
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    fontWeight: 600,
    fontSize: "22px",
  },
  retailer: { color: "#1e40af" },
  details: { color: "#dc2626" },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  item: { display: "flex", gap: "12px" },
  icon: { fontSize: "18px", color: "#1e40af", marginTop: "4px" },
  label: { fontSize: "13px", color: "#6b7280" },
  value: { fontSize: "15px", fontWeight: 600, color: "#111827" },
  loading: { padding: "40px", textAlign: "center" },
  mapWrapper: { gridColumn: "1 / -1", marginTop: "10px" },
  mapTitle: { fontWeight: 600, marginBottom: "10px" },
  map: { height: "320px", width: "100%", borderRadius: "12px" },
  noLocation: {
    gridColumn: "1 / -1",
    color: "#dc2626",
    fontWeight: 500,
  },
};

export default RetailerDetails;
