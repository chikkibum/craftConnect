import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "../LogoutButton/LogoutButton";
import UserSearch from "../UserSearch/UserSearch";
import logo from "../../assets/ddd.png";
import { toast, Bounce } from "react-toastify";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
function Navbar() {
  const history = useNavigate();
  const [navToggle, setNavToggle] = useState(0);
  const token = localStorage.getItem("token");
  const userProfile = () => {
    if (!token) {
      return history(`/login`);
    }

    try {
      const decoded = jwtDecode(token);
      history(`/${decoded.userId}`);
    } catch (error) {
      toast.error("Failed to decode token or token is invalid :(", {
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
      console.error(error);
      return null;
    }
  };

  return (
    <div className="fixed flex w-full justify-between items-center z-[999] px-5 md:px-10 lg:px-20 py-4 bg-black text-white/90">
      <div className="flex">
        <Link
          to={"/"}
          className="flex justify-center items-center gap-2 font-bold text-lg"
        >
          <img src={logo} alt="logo" className="w-12" />
          <h1>Craft Connect</h1>
        </Link>
      </div>
      <div className="flex md:hidden">
        <IoMenu className="w-7 h-7" onClick={() => setNavToggle(1)} />
      </div>
      <div
        className={`fixed top-0 ${
          navToggle ? "-left-0" : "-left-full"
        } flex md:hidden h-[100vh] w-[100vw] bg-black/90 pt-16 px-8 gap-y-5 transition-all duration-500`}
      >
        <ul className="flex flex-col gap-y-5 text-white/90 w-full  font-medium">
          <IoMdClose
            className="text-3xl cursor-pointer self-end"
            onClick={() => setNavToggle(0)}
          />
          <Link
            to={"/"}
            onClick={() => setNavToggle(0)}
            className="hover:text-[#388277] font-bold"
          >
            Home
          </Link>

          <Link
            to={"/most-upvoted"}
            onClick={() => setNavToggle(0)}
            className="hover:text-[#388277] font-bold"
          >
            Most Upvoted
          </Link>

          <p
            onClick={() => {
              userProfile();
              setNavToggle(0);
            }}
            className="cursor-pointer hover:text-[#388277] font-bold"
          >
            Profile
          </p>

          {!token ? (
            <>
              <Link
                to={"/login"}
                className="font-bold hover:text-[#388277]"
                onClick={() => setNavToggle(0)}
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="font-bold hover:text-[#388277]"
                onClick={() => setNavToggle(0)}
              >
                Register
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
          <UserSearch />
        </ul>
      </div>
      <div className="w-[60%] lg:w-1/2 hidden md:flex text-sm">
        <ul className="flex w-full justify-around items-center font-medium">
          <Link to={"/"} className="hover:text-[#388277] font-bold">
            Home
          </Link>

          <Link to={"/most-upvoted"} className="hover:text-[#388277] font-bold">
            Most Upvoted
          </Link>

          <p
            onClick={userProfile}
            className="cursor-pointer hover:text-[#388277] font-bold"
          >
            Profile
          </p>

          {!token ? (
            <>
              <Link to={"/login"} className="font-bold hover:text-[#388277]">
                Login
              </Link>
              <Link to={"/register"} className="font-bold hover:text-[#388277]">
                Register
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
          <UserSearch />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
