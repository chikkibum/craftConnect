
import { FaRegBookmark } from "react-icons/fa";
import first from "../../assets/first111-removebg-preview.png";
import second from "../../assets/second222-removebg-preview.png";
import third from "../../assets/third333-removebg-preview.png";
function Rankers({ ranker, rank }) {
  return (
    <div
      className={`top-ranker-1 bg-[#121212] shadow-md rounded-md flex flex-col  lg:flex-row items-center justify-center gap-5 p-5 `}
    >
      <div className="w-[20%] lg:w-[8%] flex justify-center items-center">
        <img
          src={rank === 1 ? first : rank === 2 ? second : third}
          alt=""
          className={`${rank !== 1 && rank !== 2 && rank !== 3 && "hidden"} ${
            rank === 1 ? "w-full" : rank === 2 ? "w-full" : "w-full"
          }`}
        />
        <div
          className={`ranking-number w-[100%] h-full bg-[#121212]  justify-center items-center font-semibold text-lg ${
            rank === 1 || rank === 2 || rank === 3 ? "hidden" : "flex"
          }`}
        >
          #{rank}
        </div>
      </div>
      <div
        className={`top-performer-details w-full flex flex-col md:flex-row justify-center items-center md:justify-start md:items-center gap-5  ${
          rank === 3 ? "text-white" : "text-white/90"
        }`}
      >
        <div className="top-performer-img w-[10.8rem]  flex justify-center items-center  overflow-hidden">
          <img
            src={ranker.user.profileImg}
            alt=""
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="top-performer-bio pr-5 w-full flex flex-col text-center md:text-start">
          <div className="personal-details flex flex-col">
            <h3
              className={`font-bold text-xl ${
                rank === 3
                  ? "text-[#388277]/90"
                  : rank == 1 || rank == 2
                  ? "text-[#388277]/90"
                  : "text-[#388277]/90"
              }`}
            >
              {ranker.user.username}
            </h3>
            <h3
              className={`font-semibold text-sm ${
                rank === 3
                  ? "text-white/80"
                  : rank == 1 || rank == 2
                  ? "text-white/80"
                  : "text-white/80"
              }`}
            >
              {ranker.user.role}
            </h3>
          </div>
          <div className="description-shorted font-medium mt-2">
            <p
              className={`text-sm text-white/60 ${
                rank === 3
                  ? "text-white/60"
                  : rank == 1 || rank == 2
                  ? "text-white/60"
                  : "text-white/60"
              }`}
            >
              {ranker.user.bio}
            </p>
          </div>
          <div className="reaction-iocon flex items-center justify-end gap-5 mt-2">
            {/* <FaRegHeart className="w-5 h-5" /> */}
            {/* <FaRegComment className="w-5 h-5" /> */}
            {/* <BiUpvote className="w-5 h-5" /> */}
            {/* <FaRegBookmark className=""/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rankers;
