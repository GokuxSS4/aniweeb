import NavBar from "@/components/NavBar";
import { Slider } from "@/components/Slider";
import { getHomePage } from "aniwatch";

export default async function Home() {
  const homePageDetails = await getHomePage();
  return (
    <div className="w-screen h-screen bg-gray-900 text-white relative">
      <NavBar />
      <Slider spotLightAnimes={homePageDetails.spotlightAnimes} />
    </div>
  );
}
