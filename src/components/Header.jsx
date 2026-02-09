import ProfileDropdown from "./ProfileDropdown";
import logo from "../assets/logo.png";
import "./Header.css";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="header">
      <button
        className="hamburger"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div
        className="header-left"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            height: "50px",
            width: "auto"
          }}
        />
        <span
          style={{
            height: "24px",
            width: "1px",
            backgroundColor: "#ccc"
          }}
        />
        <div style={{ fontSize: "18px", fontWeight: "700" }}>
          <span style={{ color: "#2563eb" }}>Ticket</span>
          <span style={{ color: "#dc2626" }}>map</span>
        </div>
      </div>

      <div className="header-right">
        <span
          className="header-icon"
          style={{ fontSize: "22px", cursor: "pointer" }}
        >
          🔔
        </span>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
