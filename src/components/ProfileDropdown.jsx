import { useState } from "react";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className="profile-wrapper"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="profile-trigger">
        👤 <span className="caret">▾</span>
      </div>

      {open && (
        <div className="profile-menu">
          <div className="menu-item">👤 My Profile</div>
          <div className="menu-item" onClick={logout}>
            🚪 Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
