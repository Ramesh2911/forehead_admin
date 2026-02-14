import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getAllPermission } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";

const customStyles = {
    headCells: {
        style: {
            fontSize: "15px",
            fontWeight: "600",
        },
    },
};

const Permission = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [allPermission, setAllPermission] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPermission();
    }, []);

    const fetchPermission = async () => {
        try {
            setLoading(true);

            const res = await getAllPermission();
            const result = res.data;

            if (result.success) {
                setAllPermission(result.data || []);
            } else {
                setAllPermission([]);
            }

        } catch (error) {
            console.error("Error fetching permissions:", error);
            setAllPermission([]);
        } finally {
            setLoading(false);
        }
    };


    const filteredData = allPermission.filter((item) =>
        item.user_name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "Name",
            selector: (row) => row.user_name,
            sortable: true,
            wrap: true,
        },
        {
            name: "Permissions",
            wrap: true,
            cell: (row) => {
                const perms = row.permissions || [];

                if (perms.length === 0) return "-";

                const firstName = perms[0]?.name;
                const remaining = perms.length - 1;
                const tooltipText = perms.map(p => p.name).join(", ");

                return (
                    <div title={tooltipText} style={{ cursor: "pointer" }}>
                        {firstName}
                        {remaining > 0 && (
                            <sup
                                style={{
                                    marginLeft: "4px",
                                    fontSize: "11px",
                                    color: "#dc2626",
                                    fontWeight: 600
                                }}
                            >
                                {remaining}
                            </sup>
                        )}
                    </div>
                );
            },
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
                    <span style={{ color: "#1e40af" }}>Permission</span>{" "}
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
                        placeholder="Search name..."
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
                        <span style={{ color: "#dc2626" }}>No Permission found!</span>
                    </div>
                }
            />
        </div>
    );
};

export default Permission;
