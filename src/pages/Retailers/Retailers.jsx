import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

/* =======================
   SAMPLE DATA
======================= */
const data = [
  {
    id: 1,
    name: "Retailer One",
    email: "one@gmail.com",
    phone: "9876543210",
    isVerify: "Pending",
  },
  {
    id: 2,
    name: "Retailer Two",
    email: "two@gmail.com",
    phone: "9876543211",
    isVerify: "Approved",
  },
  {
    id: 3,
    name: "Retailer Three",
    email: "three@gmail.com",
    phone: "9876543212",
    isVerify: "Pending",
  },
];

/* =======================
   STATUS BADGE STYLE
======================= */
const statusStyle = (status) => ({
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: 600,
  color: "#fff",
  backgroundColor: status === "Approved" ? "#16a34a" : "#f59e0b",
});

/* =======================
   TABLE STYLES (H-TAG LOOK)
======================= */
const customStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: "600",
      textTransform: "capitalize",
    },
  },
};

/* =======================
   COLUMNS
======================= */
const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    width: "70px",
    sortable: true,
  },
  {
    name: "Retailer Name",
    selector: (row) => row.name,
    sortable: true,
    wrap: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    wrap: true,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
  },
  {
    name: "Is Verify",
    cell: (row) => (
      <span style={statusStyle(row.isVerify)}>
        {row.isVerify}
      </span>
    ),
    center: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <FaEye
          size={22}
          color="#2563eb"
          title="View"
          style={{ cursor: "pointer" }}
          onClick={() => console.log("View", row.id)}
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

/* =======================
   COMPONENT
======================= */
const Retailers = () => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.includes(search)
  );

  return (
    <div style={{ padding: "20px", background: "#fff" }}>
      {/* 🔹 HEADER */}
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
          Retailers List
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

      {/* 🔹 TABLE */}
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
        customStyles={customStyles}
        noDataComponent={
          <div style={{ padding: 20, fontWeight: 500 }}>
            No data found!
          </div>
        }
      />
    </div>
  );
};

export default Retailers;
