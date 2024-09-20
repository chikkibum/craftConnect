
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UpvoteButton from "../UpvoteButton/UpvoteButton";
import CommentForm from "../CommentForm/CommentForm";
import axios from "../../api/axios";
import { toast, Bounce } from "react-toastify";
import Loader from "../Loader/Loader";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
function ProjectDetailsPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [upvoted, setUpvoted] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const response = await fetch(
        `https://craftconnect-production.up.railway.app/api/project/${projectId}`,
        {
          credentials: "include", 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setProject(data.project);
        setComments(data.comments.reverse());
        setUser(data.user);
        const upvoteResponse = await axios.get(
          `/project/${projectId}/upvote-status`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUpvoted(upvoteResponse.data.upvoted);
      } else {
        toast.error(data.message, {
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

    fetchProjectDetails();
  }, [projectId]);

  const handleCommentAdded = (comment, username, profileImg) => {
    
    setComments((prevComments) => [
      { ...comment, user: { username, profileImg } },
      ...prevComments,
    ]);
  };

  if (!project) {
    return (
      <p className="text-lg font-medium">
        <Loader />
      </p>
    );
  }

  const calculateTimePassed = (timestampStr) => {
    const timestamp = new Date(timestampStr);
    const now = new Date();
    const diffMs = now - timestamp;
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHr = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHr / 24);
    if (diffDay >= 1) {
      return `${diffDay}d ago`;
    } else if (diffHr >= 1) {
      return `${diffHr}h ago`;
    } else if (diffMin >= 1) {
      return `${diffMin}m ago`;
    } else {
      return "just now";
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-28 text-white/80 min-h-[100vh]">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col h-[300px] w-full lg:w-[40%] rounded-lg overflow-hidden bg-[#121212]">
            <div className="relative slide-container   project_imgs !h-[100%] overflow-hidden">
              <Fade arrows={false} pauseOnHover={false} duration={3000}>
                {project?.images.map((img, index) => (
                  <img
                    key={index}
                    loading="lazy"
                    src={img.url}
                    alt={img.public_id}
                    className="w-full h-[100%] !object-contain"
                  />
                ))}
              </Fade>
            </div>
          </div>
          <div className="lg:px-8 mt-8 lg:mt-0 lg:py-3">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white/90">
              {project.title}
            </h1>
            <p className="text-white/80 mb-4 text-md md:text-lg font-normal">
              {project.description}
            </p>
            <p className="text-white/80 mb-5 text-md md:text-lg font-semibold">
              Project Link -{" "}
              <Link to={project.link} target="blank" className="text-[#388277]">
                {project.link}
              </Link>
            </p>
            <UpvoteButton
              projectId={project._id}
              currentUpvotes={project.upvotes}
              setUpvotes={(upvotes) => setProject({ ...project, upvotes })}
              upvoted={upvoted}
              setUpvoted={setUpvoted}
            />
            <div className="flex items-center my-8">
              <h2 className="text-md md:text-xl font-medium mr-4 text-white/90">
                Created by:
              </h2>
              <div className="flex flex-col space-y-1">
                <p className="text-white/80 text-lg font-semibold underline underline-offset-2 flex gap-x-2 items-center">
                  <img src={user.profileImg} alt="" className="w-7 h-7" />
                  <Link to={`/${user._id}`}>{user.username}</Link>
                </p>
                <p className="text-white/60 text-sm font-normal">
                  <span className="font-semibold">Role:</span> {user.role}
                </p>
                <p className="text-white/60 text-sm font-normal">{user.bio}</p>
              </div>
            </div>
          </div>
        </div>
        <CommentForm
          projectId={project._id}
          onCommentAdded={handleCommentAdded}
        />
        <h3 className="text-xl font-medium mt-8 mb-4 text-white/90">
          Comments
        </h3>
        <ul className="list-disc space-y-2 mt-8">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-center gap-5 border-b-2 p-2 pb-4 border-gray-700"
            >
              <Link to={`/${comment.user._id}`}>
                <img
                  src={comment?.user.profileImg}
                  alt="user profile"
                  className="w-10 h-10"
                />
              </Link>
              <div className="flex flex-col">
                <p className="flex flex-col">
                  <Link
                    to={`/${comment.user._id}`}
                    className="text-white/90 font-semibold text-lg"
                  >
                    {comment.user.username}
                  </Link>
                  <span className="-mt-2 text-white/60">
                    {calculateTimePassed(comment.created_at)}
                  </span>
                </p>
                <p className="text-white/80">{comment.content}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ProjectDetailsPage;
