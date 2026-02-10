import "./Dashboard.css";
import {
  FaStore,
  FaCheckCircle,
  FaTicketAlt,
  FaCreditCard,
} from "react-icons/fa";


const Dashboard = () => {

  const stats = [
    {
      title: "Total Retailers",
      value: 1240,
      icon: FaStore,
      color: "#2563eb",
    },
    {
      title: "Active Retailers Today",
      value: 875,
      icon: FaCheckCircle,
      color: "#16a34a",
    },
    {
      title: "Listed Tickets",
      value: 320,
      icon: FaTicketAlt,
      color: "#dc2626",
    },
    {
      title: "Active Subscriptions",
      value: 410,
      icon: FaCreditCard,
      color: "#9333ea",
    },
  ];


  const recentRetailers = [
    {
      id: 1,
      name: "Sardar Lottery Store",
      location: "Kolkata, WB",
      tickets: "Dear Sea Sunday",
      status: "Active",
    },
    {
      id: 2,
      name: "Roy Lottery House",
      location: "Howrah, WB",
      tickets: "Dear Diamond",
      status: "Active",
    },
    {
      id: 3,
      name: "Mondal Ticket Shop",
      location: "Bardhaman, WB",
      tickets: "Dear Lottery",
      status: "Inactive",
    },
  ];

  const upcomingDraws = [
    { id: 1, name: "Dear Sea", time: "1:00 PM" },
    { id: 2, name: "Dear Diamond", time: "6:00 PM" },
    { id: 3, name: "Dear Gold", time: "8:00 PM" },
  ];

  return (
    <div className="dashboard">
      {/* Page Title */}
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="stats-card" key={index}>
              <div className="stats-icon" style={{ color: item.color }}>
                <Icon size={26} />
              </div>

              <div className="stats-info">
                <h4>{item.title}</h4>
                <p>{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
     
      <div className="dashboard-sections">
        <div className="card">
          <h2>Recently Added Retailers</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Shop Name</th>
                  <th>Location</th>
                  <th>Tickets Available</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRetailers.map((retailer) => (
                  <tr key={retailer.id}>
                    <td>{retailer.name}</td>
                    <td>{retailer.location}</td>
                    <td>{retailer.tickets}</td>
                    <td>
                      <span
                        className={
                          retailer.status === "Active"
                            ? "status active"
                            : "status inactive"
                        }
                      >
                        {retailer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Draws */}
        <div className="card">
          <h2>Upcoming Draws (Information Only)</h2>
          <ul className="draw-list">
            {upcomingDraws.map((draw) => (
              <li key={draw.id}>
                <span>{draw.name}</span>
                <span>{draw.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        <p>
          ⚠️ FOREHEAD is an information-only platform. No lottery tickets are
          sold, promoted, or purchased through this system.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
