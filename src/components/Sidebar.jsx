import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "./sidebarConfig";
import { hasModuleAccess } from "../services/permission";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {SIDEBAR_ITEMS.map(item =>
        hasModuleAccess(item.key) ? (
          <NavLink key={item.key} to={item.path}>
            {item.label}
          </NavLink>
        ) : null
      )}
    </aside>
  );
};

export default Sidebar;
