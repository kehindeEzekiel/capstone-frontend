import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { login } from "../../../service/auth.service";
import "./login.css";
import Background from "../../../assets/images/login2.jpg";
import { toast } from "sonner";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await login(data);
      localStorage.setItem("_tb_token", res.data.token);
      localStorage.setItem("_tb_user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Left hand side - Image */}
      <div className="image-container">
        <img src={Background} alt="login background" />
        <div className="image-overlay"></div>
      </div>
      {/* Right hand side - Form */}
      <div className="form-container">
        <div className="form-wrapper">
          <h2>Welcome Back</h2>
          <p className="subtitle">Log in to explore your favorite movies</p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                autoComplete="email"
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
