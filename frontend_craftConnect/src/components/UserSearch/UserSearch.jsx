import { useState, useCallback, useRef, useEffect } from "react";
import axios from "../../api/axios"; 
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const searchRef = useRef(null);
  const history = useNavigate();

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setQuery("");
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const fetchResults = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get("/user/search", { params: { query } });

        setResults(response.data || []);
      } catch (error) {
        toast.error("Error fetching search results :(", {
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
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }, 700),
    [] 
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    fetchResults(value);
  };

  return (
    <div ref={searchRef} className="relative flex md:justify-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="py-2  bg-[#121212] md:bg-[#121212] md:placeholder:text-white/60  placeholder:text-white/60 text-white/80 rounded-full w-full  px-5 placeholder:text-sm"
        placeholder="Search users"
      />

      <ul
        className={`absolute ${
          !results.length && !query && "hidden"
        } top-[130%] text-center font-semibold rounded-xl text-[#388277] w-full md:w-[400px] bg-[#0e0e0e] border-[3px] py-5 px-5 flex flex-col gap-1 shadow-2xl text-xs md:text-base border-gray-700`}
      >
        {isLoading && <li className="w-full">Loading...</li>}
        {isError && <li className="w-full">Error fetching results</li>}
        {results && results.length > 0 ? (
          results.map((user) => (
            <li
              className="w-full cursor-pointer border-2 border-gray-700 rounded-md py-1 flex gap-2 items-center justify-center"
              onClick={() => {
                setQuery("");
                setResults([]);
                history(`/${user._id}`);
              }}
              key={user._id}
            >
              <img src={user.profileImg} className="w-7 h-7" alt="" />{" "}
              {user.username}
            </li>
          ))
        ) : (
          <li className="w-full">No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBox;
