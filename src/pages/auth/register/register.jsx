// import { useForm } from "react-hook-form";
// import { registerSchema } from "../../../validation/auth/auth.validation";
// import "./register.css";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Background from "../../../assets/images/register.jpg";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useState } from "react";
// import { registerRoute } from "../../../service/auth.service";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(registerSchema),
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const response = await registerRoute(data);
//       toast.success("registered");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Error registring");
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       {/* === left hand side */}
//       <div className="image-container">
//         <img src={Background} alt="register background" />
//       </div>
//       {/* === right hand side */}
//       <div className="form-container">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <h2>Register</h2>
//           <div className="form-group">
//             <label htmlFor="firstName">First Name</label>
//             <input {...register("firstName")} placeholder="firstName" />
//             {errors.firstName && (
//               <p className="error">{errors.firstName.message}</p>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Last Name</label>
//             <input {...register("lastName")} placeholder="lastName" />
//             {errors.lastName && (
//               <p className="error">{errors.lastName.message}</p>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input {...register("email")} placeholder="email" />
//             {errors.email && <p className="error">{errors.email.message}</p>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>

//             <input
//               type="password"
//               {...register("password")}
//               placeholder="*********"
//             />
//             {errors.password && (
//               <p className="error">{errors.password.message}</p>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <div>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 {...register("confirmPassword")}
//                 placeholder="********"
//               />
//               {showConfirmPassword ? (
//                 <FaEye onClick={() => setShowConfirmPassword(false)} />
//               ) : (
//                 <FaEyeSlash onClick={() => setShowConfirmPassword(true)} />
//               )}
//             </div>
//             {errors.confirmPassword && (
//               <p className="error">{errors.confirmPassword.message}</p>
//             )}
//           </div>

//           <button className="submit-button" type="submit">
//             {loading ? "loading" : "Sign up"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

// ==== v2 ====
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../auth/auth.validation";
import "./register.css";
import { yupResolver } from "@hookform/resolvers/yup";
import Background from "../../../assets/images/login.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { registerRoute } from "../../../service/auth.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await registerRoute(data);
      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error registering");
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Left hand side - Image */}
      <div className="image-container">
        <img src={Background} alt="register background" />
      </div>
      {/* Right hand side - Form */}
      <div className="form-container">
        <div className="form-wrapper">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                {...register("firstName")}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="error">{errors.firstName.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                {...register("lastName")}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input {...register("email")} placeholder="Enter your email" />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
