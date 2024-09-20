import { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { toast, Bounce } from "react-toastify";
import Loader from "../../components/Loader/Loader";
const MostUpvotedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProjects = useCallback(async (currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/project/most-upvoted?page=${currentPage}&limit=20`
      );
      if (response.data.projects.length < 20) {
        setHasMore(false);
      }
      setProjects((prevProjects) => {
        const existingIds = new Set(prevProjects.map((p) => p._id));
        const newProjects = response.data.projects.filter(
          (p) => !existingIds.has(p._id)
        );
        return [...prevProjects, ...newProjects];
      });
    } catch (error) {
      toast.error("Error fetching projects :(", {
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
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchProjects(page);
  }, [page, fetchProjects]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleUpVote = (upvotes, projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId ? { ...project, upvotes: upvotes } : project
      )
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="pt-28 flex items-center  flex-col pb-16 overflow-x-hidden bg-[#0b0b0c] min-h-[100vh]">
      <h1 className="text-3xl md:text-4xl font-bold underline underline-offset-4 text-white/90  text-center">
        Most Upvoted Projects
      </h1>
      <div className="project-list relative w-full">
        {projects ? (
          <>
            <ProjectCard projects={projects} upVote={handleUpVote} />
          </>
        ) : (
          <p className="text-lg font-medium text-white/80">No Projects</p>
        )}
      </div>
      {loading && <p className="mt-10 text-white/80">Loading more projects...</p>}
      {!loading && hasMore && (
        <button
          onClick={handleLoadMore}
          className=" text-white/90  py-2 px-8 rounded-lg font-semibold
            bg-[#214e47]  hover:bg-[#286058ef] transition-all duration-300 hover:shadow-2xl"
        >
          Load More
        </button>
      )}
      {!hasMore && <p className="text-white/80">No projects to load</p>}
    </div>
  );
};

export default MostUpvotedProjects;
