import Rankers from "../../components/Rankers/Rankers";
import ProjectIdeas from "../../components/ProjectIdeas/ProjectIdeas";
import Headings from "../../components/Headings/Headings";
import { useCallback, useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Loader from "../../components/Loader/Loader";
function Hero() {
  const [rankers, setRankers] = useState([]);
  const [loading, setLoading] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(1);
    try {
      const response = await axios.get(`/project/top-ranked`);
      setRankers(response.data);
    } catch (error) {
      toast.error("Error fetching data :(", {
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
    setLoading(0);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="hero py-24 flex flex-col md:flex-row gap-5 text-white/90">
      <div className="hero-left w-full md:w-[75%]">
        <div className="top-rankers flex flex-col gap-5 w-full mt-4">
          <Headings heading={"Top Rankers"} link={"/top-ranked"} />
          {rankers?.length > 0 ? (
            rankers.map((ranker, index) => (
              <Link key={ranker._id} to={`/${ranker.user._id}`}>
                <Rankers
                  ranker={ranker}
               
                  rank={index + 1}
                />
              </Link>
            ))
          ) : (
            <p className="text-lg font-medium text-white/80">No Rankers</p>
          )}
        </div>
      </div>
      <div className="hero-right w-full md:w-[25%]">
        <div className="project-idea flex flex-col gap-5 w-full mt-4">
          <Headings heading={"Project Ideas"} link={"/projects"} />
          <ProjectIdeas
            name={"Job Portal App"}
            desc={
              "Learn how to create a Fullstack Job Portal App from scratch using ReactJS, Express, NodeJS and MongoDB."
            }
            link={"https://www.youtube.com/watch?v=F5EYXc91Cpo"}
          />
          <ProjectIdeas
            name={"Movie Recommender System"}
            desc={
              "Learn how to build a personalized movie recommendation system based on user preferences."
            }
            link={
              "https://www.youtube.com/watch?v=1xtrIEwY_zY&list=PLKnIA16_RmvY5eP91BGPa0vXUYmIdtfPQ"
            }
          />
          <ProjectIdeas
            name={"Full Stack Web Application"}
            desc={
              "how to build a full stack (dynamic/responsive) web project, crafted with MongoDB, Express.js, React.js, and Node.js."
            }
            link={"https://www.youtube.com/watch?v=7l5UgtWfnw0&t=51s"}
          />
        </div>
        <div className="ongoing-hiring flex flex-col w-full gap-y-5 mt-4">
          <Headings heading={"Courses"} link={"/hiring"} />
          <ProjectIdeas
            name={"MERN STACK IN HINDI"}
            desc={
              "Welcome to the World Best MERN Stack Tutorial in Hindi series!"
            }
            link={
              "https://www.youtube.com/playlist?list=PLwGdqUZWnOp2Z3eFOgtOGvOWIk4e8Bsr_"
            }
          />
          <ProjectIdeas
            name={"React Js Tutorials in Hindi"}
            desc={
              "Complete React Course by CodeWithHarry - Learn ReactJs from scratch in 2022 for FREE."
            }
            link={
              "https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt"
            }
          />
          <ProjectIdeas
            name={"Complete Web Dev using MERN stack || Love Babbar"}
            desc={
              "Looking to become a Full Stack Web Developer using MERN stack? You've come to the right place!"
            }
            link={
              "https://www.youtube.com/playlist?list=PLDzeHZWIZsTo0wSBcg4-NMIbC0L8evLrD"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
