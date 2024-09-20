import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import AddProjectForm from "../../components/AddProject/AddProjectForm";
import EditProjectForm from "../../components/EditProjectForm/EditProjectForm";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import Projects from "../../components/Projects/Projects";

import { toast, Bounce } from "react-toastify";
import Loader from "../../components/Loader/Loader";
function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [addProject, setAddProject] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setIsLoggedIn(0);
      const response = await axios.get(`/user/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(response.data);
      setProjects(response.data.projects);
      const token = localStorage.getItem("token");
      if (!token) {
        return setIsLoggedIn(0);
      }
      try {
        const decoded = jwtDecode(token);
        if (decoded.userId !== id) {
          return setIsLoggedIn(0);
        }
        return setIsLoggedIn(1);
       
      } catch (error) {
        toast.error("Failed to decode token :(", {
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
        return setIsLoggedIn(1);
      }
    } catch (error) {
      toast.error("Error fetching user data :(", {
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
  }, [id]);

  const handleDelete = async (projectId) => {
    try {
   
      const response = await axios.delete(
        `https://craftconnect-production.up.railway.app/api/project/${id}/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true, 
        }
      );

      if (
        response.data.message ===
        "You are not authorized to delete this project"
      ) {
        toast.warn(response.data.message, {
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
        return;
      }
      toast.success(response.data.message, {
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
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      toast.error(`${"Error deleting project :("}`, {
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
  };

  const handleEdit = (project) => {
    if (editingProject !== project) {
      setEditingProject(project);
    } else {
      setEditingProject(null);
    }
  };

  const handleUpdate = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === updatedProject._id ? updatedProject : project
      )
    );
    setEditingProject(null);
  };
  const handleAdd = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setAddProject(null);
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="pt-24 px-5 md:px-14 lg:px-20 bg-[#0b0b0c] min-h-[100vh]">
      <div className="flex flex-col">
        {user ? (
          <EditUserForm currentUser={user?.user} isLoggedIn={isLoggedIn} />
        ) : (
          <p className=" text-lg font-medium">
            <Loader />
          </p>
        )}
      </div>
      <div className="flex flex-col w-full ">
        <div className="flex justify-between px-2 md:px-8 items-center w-full">
          <div className="md:w-1/4 hidden md:flex"></div>
          <h1 className="text-4xl font-bold underline underline-offset-4 md:w-1/4 text-center text-white/90">
            Projects
          </h1>
          {isLoggedIn ? (
            <div className="md:w-1/4 flex justify-end">
              <button
                className=" text-white/90 py-2 md:px-4 rounded-lg font-semibold
            bg-[#214e47]  hover:bg-[#286058ef] transition-all duration-300 hover:shadow-2xl z-10 text-xs px-3 md:text-base"
                onClick={() => setAddProject(!addProject)}
              >
                + Add Project
              </button>
            </div>
          ) : (
            <div className="md:w-1/4"></div>
          )}
        </div>
        <div className="relative w-full bg-[#0b0b0c]">
          {projects.length > 0 ? (
            <>
              <Projects
                projects={projects}
                isLoggedIn={isLoggedIn}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                setProjects={setProjects}
              />
              <div
                className={`edit-project-form-container w-full z-20 ${
                  editingProject ? "flex" : "hidden"
                }`}
              >
                {isLoggedIn
                  ? projects.map(
                      (project) =>
                        editingProject &&
                        editingProject._id === project._id && (
                          <EditProjectForm
                            id={id}
                            key={id}
                            project={project}
                            onUpdate={handleUpdate}
                            onClose={() => setEditingProject(null)}
                          />
                        )
                    )
                  : ""}
              </div>
            </>
          ) : (
            <p className="text-center text-white/80 bg-[#0b0b0c] font-medium text-lg mt-16">
              No Projects
            </p>
          )}
        </div>
      </div>
      <div
        className={`edit-project-form-container z-20 ${
          addProject ? "flex" : "hidden"
        }`}
      >
        {isLoggedIn ? (
          addProject ? (
            <AddProjectForm
              userId={user?.user._id}
              onAdd={handleAdd}
              onClose={() => setAddProject(null)}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Profile;
