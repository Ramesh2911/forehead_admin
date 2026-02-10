import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginApi } from "../../services/auth.api";
import { setToken } from "../../services/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginApi({ email, password });

      const data = res.data;

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }
     
      setToken(data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("role", data.user.role_name);
      localStorage.setItem("user", JSON.stringify(data.user));
     
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-left">
          <div className="brand-text">
            <span className="ticket">Ticket</span>
            <span className="map">map</span>
          </div>
        </div>

        <div className="login-right">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="forgot-password">
              <span>Forgot password?</span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign Me In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
