import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getAllModules } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";

const customStyles = {
    headCells: {
        style: {
            fontSize: "15px",
            fontWeight: "600",
        },
    },
};

const Module = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [allModules, setAllModules] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            setLoading(true);

            const res = await getAllModules();
            const result = res.data;

            if (result.success) {
                setAllModules(result.data || []);
            } else {
                setAllModules([]);
            }

        } catch (error) {
            console.error("Error fetching retailers:", error);
            setAllModules([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredData = allModules.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "16px" }}>
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

    return (
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
                    <span style={{ color: "#1e40af" }}>Module</span>{" "}
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
                        placeholder="Search module..."
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
                        <span style={{ color: "#dc2626" }}>No Module found!</span>
                    </div>
                }
            />
        </div>
    );
};

export default Module;
