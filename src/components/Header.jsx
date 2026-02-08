import ProfileDropdown from "./ProfileDropdown";
import logo from "../assets/logo.jpeg";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="logo" />
      </div>

      <div className="header-right">
        <span className="icon">🔔</span>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
