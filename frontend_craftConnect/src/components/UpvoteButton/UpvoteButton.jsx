import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
const UpvoteButton = ({ projectId, currentUpvotes, setUpvotes }) => {
  const [upvoted, setUpvoted] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const fetchUpvoteStatus = async () => {
      try {
        const response = await axios.get(
          `/project/${projectId}/upvote-status`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUpvoted(response.data.upvoted);
      } catch (error) {
        if (
          error.response?.data?.message == "Token is not valid" ||
          error.response?.data?.message == "No token, authorization denied" ||
          error.response.status == 401
        ) {
          return;
        } else {
          toast.error(error.response?.data?.message + ":(", {
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
          console.error(
            "Failed to fetch upvote status:",
            error.response?.data?.message
          );
        }
      }
    };

    fetchUpvoteStatus();
  }, [projectId]);

  const handleUpvote = async () => {
    try {
      const response = await axios.put(
        `/project/${projectId}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUpvotes(response.data.upvotes);
      setUpvoted(!upvoted);
    } catch (error) {
      if (error.response?.data?.message == "Token is not valid") {
        history("/login");
      }
      toast.error(error.response?.data?.message + " Login first", {
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

      console.error(error.response?.data?.message);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      className="flex items-center md:text-md font-medium hover:text-[#388277]"
    >
      {upvoted ? (
        <BiSolidUpvote className="w-5 h-5 mr-1 text-[#388277]" />
      ) : (
        <BiUpvote className="w-5 h-5 mr-1" />
      )}{" "}
      {currentUpvotes}
    </button>
  );
};

export default UpvoteButton;
