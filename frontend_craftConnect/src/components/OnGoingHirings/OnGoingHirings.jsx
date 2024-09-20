import { RxExternalLink } from "react-icons/rx";
function OnGoingHirings() {
  return (
    <div className="ongoing-hiring-1 bg-gray-200 rounded-md flex items-center gap-5 p-3 w-full mt-5 justify-between">
      <div className="ongoing-hiring-detail">
        <h3 className="font-semibold text-lg">Comapany Name</h3>
        <p className="ongoing-hiring-job-role text-sm text-gray-600">
          FullStack Developer
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <RxExternalLink className="w-5 h-5" />
      </div>
    </div>
  );
}

export default OnGoingHirings;
