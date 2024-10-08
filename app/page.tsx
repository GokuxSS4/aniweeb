import { getHomePage, getAnimeAboutInfo } from "aniwatch";

import { SpotLight } from "@/components/SpotLight";
import { Trending } from "@/components/Trending";
import { Top10Anime } from "@/components/Top10Anime";

export default async function Home() {
  const homePageDetails = await getHomePage();
  // dragon-ball-daima-19328
  //  'black-clover-2404'
  // const animeInfo = await getAnimeAboutInfo('black-clover-2404');
  // console.log(animeInfo.anime);
  // console.log(homePageDetails);
  return (
    <div className="text-white flex flex-col gap-5">
      <SpotLight spotLightAnimes={homePageDetails.spotlightAnimes} />
      <div className="w-10/12 mx-auto">
        <Trending aniList={homePageDetails.trendingAnimes} />
        <Top10Anime top10AniDetails={homePageDetails.top10Animes} />
      </div>
    </div>
  );
}
