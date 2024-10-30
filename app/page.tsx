import { SpotLight } from "@/components/home/SpotLight";
import { Trending } from "@/components/home/Trending";
import { TopAnimes } from "@/components/home/TopAnime";
import { EstimatedSchedule } from "@/components/home/EstimatedScheduel";
import { TopUpcoming } from "@/components/home/TopUpcoming";
import { LatestEpisodes } from "@/components/home/LatestEpisodes";
import { getHomeData } from "@/actions";
import { HiAnime } from "aniwatch";


export default async function Home() {
  const homePageData:HiAnime.ScrapedHomePage = await getHomeData();


  const top10Animes = {
    "top airing":homePageData.topAiringAnimes.slice(0,10),
    ...homePageData.top10Animes,
  }

  console.log("top10Animes",Object.keys(top10Animes));

  return (
    <div className="text-white flex flex-col gap-5">
      <SpotLight
        spotLightAnimes={homePageData.spotlightAnimes}
      />
      <div className="w-[90%] mx-auto">
        <Trending aniList={homePageData.trendingAnimes} />
        <TopAnimes top10Animes={top10Animes} />
        <LatestEpisodes
          aniList={homePageData.latestEpisodeAnimes}
        />
        <EstimatedSchedule />
        <TopUpcoming aniList={homePageData.topUpcomingAnimes} />
      </div>
    </div>
  );
}
