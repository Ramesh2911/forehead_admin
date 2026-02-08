import { useState } from "react";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className="profile"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="icon">👤</span>

      {open && (
        <div className="dropdown">
          <div className="dropdown-item">👤 Profile</div>
          <div className="dropdown-item" onClick={logout}>
            🚪 Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
