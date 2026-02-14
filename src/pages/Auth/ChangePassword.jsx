import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { changePasswordApi } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.oldPassword.trim()) {
            newErrors.oldPassword = "Old password is required";
        }

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "Minimum 6 characters required";
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            const res = await changePasswordApi({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            });

            const data = res.data;

            if (!data.success) {
                toast.error(data.message || "Something went wrong");
                return;
            }

            toast.success("Password updated successfully");


            setTimeout(() => {
                navigate("/", { replace: true });
            }, 3000);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Server error, please try again"
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
                    <h2>Change Password</h2>

                    <form onSubmit={handleSubmit}>
                        <label>Old Password</label>
                        <div className="password-box">
                            <input
                                type={showPassword.old ? "text" : "password"}
                                name="oldPassword"
                                placeholder="Enter old password"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={() =>
                                    setShowPassword({
                                        ...showPassword,
                                        old: !showPassword.old,
                                    })
                                }
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword.old ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {errors.oldPassword && (
                            <p className="error-text">{errors.oldPassword}</p>
                        )}
                       
                        <label>New Password</label>
                        <div className="password-box">
                            <input
                                type={showPassword.new ? "text" : "password"}
                                name="newPassword"
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={() =>
                                    setShowPassword({
                                        ...showPassword,
                                        new: !showPassword.new,
                                    })
                                }
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword.new ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {errors.newPassword && (
                            <p className="error-text">{errors.newPassword}</p>
                        )}
                       
                        <label>Confirm Password</label>
                        <div className="password-box">
                            <input
                                type={showPassword.confirm ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={() =>
                                    setShowPassword({
                                        ...showPassword,
                                        confirm: !showPassword.confirm,
                                    })
                                }
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword.confirm ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {errors.confirmPassword && (
                            <p className="error-text">{errors.confirmPassword}</p>
                        )}

                        <button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
