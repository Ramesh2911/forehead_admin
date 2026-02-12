import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getAllRetailers } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";

const statusStyle = (status) => ({
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: 600,
  color: "#fff",
  backgroundColor: status === "Approved" ? "#16a34a" : "#f59e0b",
});

const customStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: "600",
    },
  },
};

const Retailers = () => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [allRetailers, setAllRetailers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRetailers();
  }, []);

  const fetchRetailers = async () => {
    try {
      setLoading(true);

      const res = await getAllRetailers();
      const result = res.data;

      if (result.success) {
        setAllRetailers(result.data || []);
      } else {
        setAllRetailers([]);
      }

    } catch (error) {
      console.error("Error fetching retailers:", error);
      setAllRetailers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = allRetailers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.includes(search) ||
    item.retailerId?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row.retailerId,
      sortable: true,
      wrap: true,
    },
    {
      name: "Retailer Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Is Verify",
      cell: (row) => (
        <span style={statusStyle(row.is_verified === 1 ? "Approved" : "Pending")}>
          {row.is_verified === 1 ? "Approved" : "Pending"}
        </span>
      ),
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
            onClick={() => navigate(`/retailer-details?id=${row.id}`)}
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
          <span style={{ color: "#1e40af" }}>Retailers</span>{" "}
          <span style={{ color: "#dc2626" }}>List</span>
        </h2>

        <input
          type="text"
          placeholder="Search retailers..."
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
            <span style={{ color: "#dc2626" }}>No Retailers found!</span>
          </div>
        }
      />
    </div>
  );
};

export default Retailers;
