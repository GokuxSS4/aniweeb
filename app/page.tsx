import { getHomePage,getAnimeAboutInfo } from "aniwatch";

import { SpotLight } from "@/components/SpotLight";
import { Trending } from "@/components/Trending";

export default async function Home() {
  const homePageDetails = await getHomePage();
  const animeInfo = await getAnimeAboutInfo('steinsgate-3');
  console.log(animeInfo.anime.info.stats);
  return (
    <div className="text-white">
        <SpotLight spotLightAnimes={homePageDetails.spotlightAnimes} />
        <Trending aniList={homePageDetails.trendingAnimes} />
    </div>
  );
}
