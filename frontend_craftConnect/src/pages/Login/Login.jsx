// src/pages/LoginPage.jsx
import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
function Login() {
  const history = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message + " :)", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      localStorage.setItem("token", response.data.token); 
      history("/");
    } catch (error) {
      toast.error(error.response.data.message + ":(", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("/auth/google-login", {
        credential: credentialResponse.credential,
      });
      toast.success(
        `${
          res.data.action == "Register"
            ? `Registered successfully, Please complete your profile`
            : `Login successfully`
        } :)`,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
      localStorage.setItem("token", res.data.token);
      if (res.data.action == "Register") {
        return history(`/${res.data.user._id}`);
      }
      history("/");
    } catch (error) {
      toast.error("Google login failed :(", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0b0b0c] min-h-[100vh]">
      <motion.div
        className="w-full max-w-sm p-6 bg-[#0e0e0e] rounded-lg shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-white/90">Login</h1>
        <div className="mb-4 mt-5 flex justify-center rounded-full">
          <GoogleLogin
            theme="filled_black"
            text="signin_with"
            shape="pill"
            size="large"
            width={"220px"}
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log("Login Failed");
              toast.error("Google login failed :(", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            }}
          />
        </div>
        <div className="flex mb-3 justify-center items-center">
          <div className="w-16 h-[2px] bg-[#a5a5a57e] mr-5"></div>
          <div className="text-white/60">or</div>
          <div className="w-16 h-[2px] bg-[#a5a5a57e] ml-5"></div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/60"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="mt-1 block w-full appearance-none rounded-md bg-[#121212] text-white/80 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#388277] focus:outline-none focus:ring-green-200 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/60"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full appearance-none rounded-md bg-[#121212] text-white/80 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#388277] focus:outline-none focus:ring-green-200 sm:text-sm"
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white/90 bg-[#214e47]  hover:bg-[#286058ef] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#388277] transition duration-300 ease-in-out transform"
            >
              Sign in
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
