import { lazy, Suspense } from "react";
import Loader from "../../components/Loader/Loader";
const Hero = lazy(() => import("./Hero"));
function Home() {
  return (
    <div className="px-5 md:px-12 lg:px-20 bg-[#0b0b0c] min-h-[100vh]">
      <Suspense fallback={<Loader />}>
        <Hero />
      </Suspense>
    </div>
  );
}

export default Home;
