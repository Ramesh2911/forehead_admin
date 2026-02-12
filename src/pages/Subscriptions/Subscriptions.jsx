import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import {
    getAllSubscriptions,
    getSubscriptionsDetails
} from "../../services/auth.api";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

const customStyles = {
    headCells: {
        style: {
            fontSize: "15px",
            fontWeight: "600",
        },
    },
};

const Subscriptions = () => {

    const [search, setSearch] = useState("");
    const [allSubscriptions, setAllSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);


    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);

            const res = await getAllSubscriptions();
            const result = res.data;

            if (result.success) {
                setAllSubscriptions(result.data || []);
            } else {
                setAllSubscriptions([]);
            }

        } catch (error) {
            console.error("Error fetching subscriptions:", error);
            setAllSubscriptions([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredData = allSubscriptions.filter((item) =>
        item.plan_name.toLowerCase().includes(search.toLowerCase()) ||
        item.plan_type.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "Name",
            selector: (row) => row.plan_name,
            sortable: true,
            wrap: true,
        },
        {
            name: "Type",
            selector: (row) => row.plan_type,
            sortable: true,
            wrap: true,
        },
        {
            name: "Price",
            selector: (row) => `₹${row.price}`,
            sortable: true,
            wrap: true,
        },
        {
            name: "Duration",
            selector: (row) => `${row.duration_days}days`,
            sortable: true,
            wrap: true,
        },
        {
            name: "Status",
            selector: (row) => (
                <span
                    className={`badge ${row.status === "ACTIVE"
                        ? "bg-success"
                        : "bg-danger"
                        }`}
                >
                    {row.status}
                </span>
            ),
            center: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "16px" }}>
                    <FaEye
                        size={22}
                        color="#2563eb"
                        title="View"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleView(row.id)}
                    />
                    <FaEdit
                        size={22}
                        color="#16a34a"
                        title="Edit"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log("Edit", row.id)}
                    />
                    <FaTrash
                        size={22}
                        color="#dc2626"
                        title="Delete"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log("Delete", row.id)}
                    />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "170px",
        },
    ];

    const handleView = async (id) => {
        try {
            setDetailsLoading(true);
            setShowModal(true);

            const res = await getSubscriptionsDetails(id);
            const result = res.data;

            if (result.success) {
                setSelectedPlan(result.data);
            } else {
                setSelectedPlan(null);
            }

        } catch (error) {
            console.error("Error fetching details:", error);
            setSelectedPlan(null);
        } finally {
            setDetailsLoading(false);
        }
    };

    return (
        <>
            <div style={{ padding: "20px", background: "#fff" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px",
                        flexWrap: "wrap",
                        gap: "10px",
                    }}
                >
                    <h2 style={{ margin: 0, fontWeight: 600 }}>
                        <span style={{ color: "#1e40af" }}>Subscriptions</span>{" "}
                        <span style={{ color: "#dc2626" }}>List</span>
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search subscriptions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "20px",
                                border: "1px solid #d1d5db",
                                outline: "none",
                                minWidth: "220px",
                            }}
                        />

                        <button
                            style={{
                                backgroundColor: "#1e40af",
                                color: "#fff",
                                border: "none",
                                padding: "8px 18px",
                                borderRadius: "20px",
                                cursor: "pointer",
                                fontWeight: 500,
                            }}
                        //onClick={() => navigate("/categories/add")} 
                        >
                            + Add
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 50, 100, 500]}
                    highlightOnHover
                    striped
                    responsive
                    dense
                    progressPending={loading}
                    customStyles={customStyles}
                    noDataComponent={
                        <div style={{ padding: 20, fontWeight: 500 }}>
                            <span style={{ color: "#dc2626" }}>No Subscriptions found!</span>
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
                        {selectedPlan?.plan_name} ({selectedPlan?.plan_type})
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {detailsLoading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : selectedPlan ? (
                        <>
                            {/* ONE ROW INFO SECTION */}
                            <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4 flex-wrap">

                                <div><strong>Role:</strong> {selectedPlan.role_name}</div>

                                <div><strong>Price:</strong> ₹{selectedPlan.price}</div>

                                <div><strong>Duration:</strong> {selectedPlan.duration_days} days</div>

                                <div>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`badge ${selectedPlan.status === "ACTIVE"
                                                ? "bg-success"
                                                : "bg-danger"
                                            }`}
                                    >
                                        {selectedPlan.status}
                                    </span>
                                </div>

                            </div>

                            {/* FEATURES SECTION */}
                            <h5 className="mb-3">Features</h5>

                            <div className="row">
                                {selectedPlan.features.map((feature) => (
                                    <div key={feature.id} className="col-md-6 mb-3">

                                        <div className="d-flex align-items-start p-2 border rounded h-100">

                                            <FaCheckCircle
                                                color="#2563eb"
                                                size={18}
                                                className="me-2 mt-1"
                                            />

                                            <div>
                                                <div className="fw-semibold">
                                                    {feature.title}
                                                </div>
                                                <div className="text-muted small">
                                                    {feature.description}
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-danger">No details found</p>
                    )}

                </Modal.Body>
            </Modal>

        </>
    );
};

export default Subscriptions;
