import { useState, useRef, useEffect } from "react";
import { logoutApi } from "../services/auth.api";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const logout = async () => {
    try {
      await logoutApi();

      localStorage.clear();
      sessionStorage.clear();

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);

      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-wrapper" ref={wrapperRef}>
      <div
        className="profile-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span style={{ fontSize: "20px", lineHeight: "1" }}>👤</span>
      </div>

      <div className={`profile-menu ${open ? "open" : ""}`}>
        <div className="menu-item"
          onClick={() => {
            navigate("/my-profile");
            setOpen(false);
          }}
        >
          👤 <span>My Profile</span>
        </div>

        <div className="menu-item" onClick={logout}>
          🔓 <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
