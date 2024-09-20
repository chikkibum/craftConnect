import { Link, useNavigate } from "react-router-dom";
import UpvoteButton from "../UpvoteButton/UpvoteButton";
import { FaLink } from "react-icons/fa6";
import { FaLinkSlash } from "react-icons/fa6";
import { VscCommentUnresolved } from "react-icons/vsc";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
const ProjectCard = ({ projects, upVote }) => {
  const history = useNavigate();
  return (
    <div className="flex flex-wrap justify-center px-5 md:px-10 items-center my-16 gap-y-16 gap-x-10">
      {projects.map((project, index) => (
        <div
          key={index}
          className="flex flex-col h-[480px] w-full lg:w-[28%] rounded-lg overflow-hidden bg-[#121212] shadow-2xl shadow-white/5"
        >
          <div className="relative slide-container  project_imgs !h-[45%] overflow-hidden">
            <Fade arrows={false} pauseOnHover={false} duration={3000}>
              {project.images.map((img, index) => (
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
          <div className="bg-[#0e0e0e] h-[55%] p-5  flex flex-col justify-between">
            <div className="link flex items-center justify-between mb-3">
              <Link
                to={`/project/${project._id}`}
                className="flex justify-between w-full items-center mr-2"
              >
                <h2 className="font-bold text-xl text-white/90 hover:underline">
                  {project.title}
                </h2>
              </Link>{" "}
              {project.link.length > 0 ? (
                <Link to={project.link} target="blank">
                  <FaLink className={"w-5 h-5 text-white/90"} />
                </Link>
              ) : (
                <Link>
                  <FaLinkSlash
                    className={"w-5 h-5 cursor-not-allowed text-white/90"}
                  />
                </Link>
              )}
            </div>
            <p className="font-medium text-base scroll-auto h-[41%] overflow-y-scroll w-full bar project-desc  text-white/80">
              {project.description}
            </p>
            <div className="flex w-full justify-between mt-3 items-center gap-x-4">
              <button
                onClick={() => {
                  history(`/project/${project._id}`);
                }}
                className="bg-[#214e47]  hover:bg-[#286058ef] text-base  text-white/90 font-semibold  z-10 py-1 rounded-md w-[40%]"
              >
                Read More
              </button>{" "}
              <div className="flex gap-4 items-center text-white/90">
                <UpvoteButton
                  projectId={project._id}
                  currentUpvotes={project.upvotes}
                  setUpvotes={(upvotes) => {
                    upVote(upvotes, project._id);
                  }}
                />{" "}
                <Link to={`/project/${project._id}`}>
                  <VscCommentUnresolved className="w-5 h-5 hover:text-[#388277]" />
                </Link>
              </div>{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
