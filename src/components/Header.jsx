import ProfileDropdown from "./ProfileDropdown";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="logo" className="header-logo" />
      </div>

      <div className="header-right">
        <span className="header-icon">🔔</span>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
