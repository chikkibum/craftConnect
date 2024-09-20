import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast, Bounce } from "react-toastify";
const LogoutButton = () => {
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token"); 
      toast.success("Logged out successfully", {
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
      history("/login");
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
      console.error("Failed to logout:", error.response.data.message);
    }
  };

  return (
    <button
      className="cursor-pointer text-start md:text-center hover:text-[#388277] font-bold"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
