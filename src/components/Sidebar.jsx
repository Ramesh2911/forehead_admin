import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Sidebar.css";

const WORK_ZONE_MODULES = ["tickets", "draws", "results"];

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const [permissions, setPermissions] = useState([]);
  const [openWorkZone, setOpenWorkZone] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setPermissions(storedUser.permissions || []);
  }, []);

  // ===== Separate Dashboard =====
  const dashboardItem = permissions.find(
    (p) => p.name.toLowerCase() === "dashboard"
  );

  // ===== Work Zone Items =====
  const workZoneItems = permissions.filter((p) =>
    WORK_ZONE_MODULES.includes(p.name.toLowerCase())
  );

  // ===== Other Items =====
  const otherItems = permissions.filter(
    (p) =>
      p.name.toLowerCase() !== "dashboard" &&
      !WORK_ZONE_MODULES.includes(p.name.toLowerCase())
  );

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={"sidebar" + (isOpen ? " open" : "")}>
        {/* ===== Mobile Header ===== */}
        <div className="sidebar-mobile-header">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <img src={logo} alt="logo" style={{ height: 36 }} />
            <div style={{ fontSize: 16, fontWeight: 700 }}>
              <span style={{ color: "#2563eb" }}>Ticket</span>
              <span style={{ color: "#dc2626" }}>map</span>
            </div>
          </div>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>

        {/* ===== Sidebar Menu ===== */}
        <div className="sidebar-menu">

          {/* ===== DASHBOARD FIRST ===== */}
          {dashboardItem && (() => {
            const IconComponent = FaIcons[dashboardItem.icon];
            if (!IconComponent) return null;

            return (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  "sidebar-item" + (isActive ? " active" : "")
                }
              >
                <span
                  className="sidebar-icon"
                  style={{ color: dashboardItem.iconColor }}
                >
                  <IconComponent size={17} />
                </span>
                <span className="sidebar-label">
                  {dashboardItem.name}
                </span>
              </NavLink>
            );
          })()}

          {/* ===== WORK ZONE AFTER DASHBOARD ===== */}
          {workZoneItems.length > 0 && (
            <div>
              <div
                className="sidebar-item workzone-header"
                onClick={() => setOpenWorkZone(!openWorkZone)}
              >
                <span className="sidebar-label">Work Zone</span>
                <FaChevronDown
                  className={`chevron ${openWorkZone ? "open" : ""}`}
                />
              </div>

              {openWorkZone &&
                workZoneItems.map((item) => {
                  const IconComponent = FaIcons[item.icon];
                  if (!IconComponent) return null;

                  return (
                    <NavLink
                      key={item.id}
                      to={`/${item.name.toLowerCase()}`}
                      className={({ isActive }) =>
                        "sidebar-item sub-item" +
                        (isActive ? " active" : "")
                      }
                    >
                      <span
                        className="sidebar-icon"
                        style={{ color: item.iconColor }}
                      >
                        <IconComponent size={15} />
                      </span>
                      <span className="sidebar-label">
                        {item.name}
                      </span>
                    </NavLink>
                  );
                })}
            </div>
          )}

          {/* ===== OTHER MENUS ===== */}
          {otherItems.map((item) => {
            const IconComponent = FaIcons[item.icon];
            if (!IconComponent) return null;

            return (
              <NavLink
                key={item.id}
                to={`/${item.name.toLowerCase()}`}
                className={({ isActive }) =>
                  "sidebar-item" + (isActive ? " active" : "")
                }
              >
                <span
                  className="sidebar-icon"
                  style={{ color: item.iconColor }}
                >
                  <IconComponent size={17} />
                </span>
                <span className="sidebar-label">
                  {item.name}
                </span>
              </NavLink>
            );
          })}

        </div>
      </aside>
    </>
  );
};

export default Sidebar;




