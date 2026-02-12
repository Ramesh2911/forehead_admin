import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import {
    getAllCustomers,
    getCustomerDetails
} from "../../services/auth.api";
import { Modal, Spinner } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const customStyles = {
    headCells: {
        style: {
            fontSize: "15px",
            fontWeight: "600",
        },
    },
};

const Customers = () => {

    const [search, setSearch] = useState("");
    const [allCustomers, setAllCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const res = await getAllCustomers();
            const result = res.data;

            if (result.success) {
                setAllCustomers(result.data || []);
            } else {
                setAllCustomers([]);
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            setAllCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleView = async (id) => {
        try {
            setShowModal(true);
            setDetailsLoading(true);

            const res = await getCustomerDetails(id);
            const result = res.data;

            if (result.success) {
                setSelectedCustomer(result.data);
            } else {
                setSelectedCustomer(null);
            }

        } catch (error) {
            console.error("Error fetching details:", error);
            setSelectedCustomer(null);
        } finally {
            setDetailsLoading(false);
        }
    };

    const filteredData = allCustomers.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase()) ||
        item.police_station.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
        },
        {
            name: "Police Station",
            selector: (row) => row.police_station,
            center: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "16px" }}>
                    <FaEye
                        size={20}
                        color="#2563eb"
                        title="View"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleView(row.user_id)}
                    />
                    <FaEdit
                        size={20}
                        color="#16a34a"
                        style={{ cursor: "pointer" }}
                    />
                    <FaTrash
                        size={20}
                        color="#dc2626"
                        style={{ cursor: "pointer" }}
                    />
                </div>
            ),
            ignoreRowClick: true,
            button: true,
            width: "150px",
        },
    ];

    return (
        <>
            <div style={{ padding: "20px", background: "#fff" }}>
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <h4 className="fw-semibold">
                        <span style={{ color: "#1e40af" }}>Customers</span>{" "}
                        <span style={{ color: "#dc2626" }}>List</span>
                    </h4>

                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                        style={{ maxWidth: "250px", borderRadius: "20px" }}
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    dense
                    progressPending={loading}
                    customStyles={customStyles}
                    noDataComponent={
                        <div className="py-3 fw-semibold text-danger">
                            No Customers found!
                        </div>
                    }
                />
            </div>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span style={{ color: "#1e40af" }}>Customer </span>
                        <span style={{ color: "#dc2626" }}>Details</span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {detailsLoading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : selectedCustomer ? (
                        <>
                            <div className="container-fluid mb-4 bg-light p-3 rounded shadow-sm">

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>Name:</strong> {selectedCustomer.name}
                                    </div>
                                    <div className="col-md-6">
                                        <strong>Phone:</strong> {selectedCustomer.phone}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>Email:</strong> {selectedCustomer.email || "-"}
                                    </div>
                                    <div className="col-md-6">
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`badge ${selectedCustomer.status === "ACTIVE"
                                                    ? "bg-success"
                                                    : "bg-danger"
                                                }`}
                                        >
                                            {selectedCustomer.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>Police Station:</strong> {selectedCustomer.police_station}
                                    </div>
                                    <div className="col-md-6">
                                        <strong>Pin:</strong> {selectedCustomer.pin}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>Address:</strong> {selectedCustomer.address}
                                    </div>
                                    <div className="col-md-6">
                                        <strong>Register Date & Time:</strong>{" "}
                                        {new Date(selectedCustomer.created_at).toLocaleString("en-GB")}
                                    </div>
                                </div>
                            </div>

                            <MapContainer
                                center={[
                                    parseFloat(selectedCustomer.latitude),
                                    parseFloat(selectedCustomer.longitude),
                                ]}
                                zoom={15}
                                style={{ height: "320px", width: "100%" }}
                            >
                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker
                                    position={[
                                        parseFloat(selectedCustomer.latitude),
                                        parseFloat(selectedCustomer.longitude),
                                    ]}
                                >
                                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                                        📍 Lat: {selectedCustomer.latitude} <br />
                                        📍 Lng: {selectedCustomer.longitude}
                                    </Tooltip>
                                    <Popup>
                                        <strong>{selectedCustomer.name}</strong><br />
                                        {selectedCustomer.address}
                                    </Popup>
                                </Marker>

                            </MapContainer>
                        </>
                    ) : (
                        <div className="text-danger text-center">
                            No details found
                        </div>
                    )}

                </Modal.Body>
            </Modal>
        </>
    );
};

export default Customers;
