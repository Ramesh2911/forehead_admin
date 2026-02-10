import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "./sidebarConfig";
import { hasModuleAccess } from "../services/permission";
import logo from "../assets/logo.png";
import "./Sidebar.css";

const Sidebar = ({ isOpen = false, onClose = () => { } }) => {
  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={"sidebar" + (isOpen ? " open" : "")}>
        <div className="sidebar-mobile-header">
          <div className="mobile-brand" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <img src={logo} alt="logo" style={{ height: 36, width: "auto" }} />
            <div style={{ fontSize: 16, fontWeight: 700 }}>
              <span style={{ color: "#2563eb" }}>Ticket</span>
              <span style={{ color: "#dc2626" }}>map</span>
            </div>
          </div>

          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            ×
          </button>
        </div>

        <div className="sidebar-menu">
          {SIDEBAR_ITEMS?.map(
            (item) =>
              hasModuleAccess(item.key) && (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive }) =>
                    "sidebar-item" + (isActive ? " active" : "")
                  }
                >
                  <span
                    className="sidebar-icon"
                    style={{ color: item.iconColor }}
                  >
                    <item.icon size={17} />
                  </span>

                  <span className="sidebar-label">{item.label}</span>
                </NavLink>
              )
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
