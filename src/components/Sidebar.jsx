import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "./sidebarConfig";
import { hasModuleAccess } from "../services/permission";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {SIDEBAR_ITEMS.map(
          (item) =>
            hasModuleAccess(item.key) && (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  "sidebar-item" + (isActive ? " active" : "")
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            )
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
