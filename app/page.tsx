import { getHomePage } from "aniwatch";

import NavBar from "@/components/NavBar";
import { SpotLight } from "@/components/SpotLight";
import { Trending } from "@/components/Trending";

export default async function Home() {
  const homePageDetails = await getHomePage();
  console.log(homePageDetails.spotlightAnimes);
  return (
    <div className="w-screen h-screen text-white">
      <div className="relative">
        <NavBar />
        <SpotLight spotLightAnimes={homePageDetails.spotlightAnimes} />
      </div>
      <div className="mt-[540px]"></div>
      <div className="w-full">
        <Trending aniList={homePageDetails.trendingAnimes} />
        <div className="w-full h-11">

        </div>
      </div>
    </div>
  );
}
