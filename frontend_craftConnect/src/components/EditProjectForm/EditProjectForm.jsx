// components/EditProjectForm.jsx
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import axios from "../../api/axios";
const EditProjectForm = ({ id, project, onUpdate, onClose }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [link, setLink] = useState(project.link);
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.warn("You can upload a maximum of 3 files.", {
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
    for (const file of files) {
      if (file.size > 500 * 1024) {
        toast.warn("Each file must be less than 500KB.", {
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
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);

    for (const image of images) {
      formData.append("images", image);
    }

    try {
      const response = await axios.put(
        `https://craftconnect-production.up.railway.app/api/project/${id}/${project._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message, {
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
        onUpdate(data.project);
      } else {
        toast.error("An error occurred while updating the project.", {
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
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the project.", {
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
    <form
      onSubmit={handleSubmit}
      className="bg-[#0e0e0e]  shadow-2xl rounded-md p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[70%] z-50"
    >
      <div className="w-full flex flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white/90 mb-4">Edit Project</h2>
        <IoMdClose
          className="text-3xl cursor-pointer z-10 text-white/90"
          onClick={onClose}
        />{" "}
      </div>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-white/60"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full appearance-none rounded-md bg-[#121212] text-white/80 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-200 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-white/60"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full appearance-none rounded-md bg-[#121212] text-white/80 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-200 sm:text-sm"
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="link"
          className="block text-sm font-medium text-white/60"
        >
          Link
        </label>
        <input
          id="link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="mt-1 block w-full appearance-none rounded-md bg-[#121212] text-white/80 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-200 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="images"
          className="block text-sm font-medium text-white/60"
        >
          Images (Max 3 files, 500KB each)
        </label>
        <input
          id="images"
          type="file"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full appearance-none rounded-md bg-[#121212] text-white/80 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-200 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="text-white/90 py-2 md:px-4 rounded-sm font-semibold
            bg-[#214e47]  hover:bg-[#286058ef] transition-all duration-300 hover:shadow-2xl z-10 text-xs px-3 md:text-base w-full mt-2"
      >
        Update Project
      </button>
    </form>
  );
};

export default EditProjectForm;
