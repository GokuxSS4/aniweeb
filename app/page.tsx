import { HiAnime } from "aniwatch";

import { SpotLight } from "@/components/home/SpotLight";
import { Trending } from "@/components/home/Trending";
import { TopAnimes } from "@/components/home/TopAnime";
import { EstimatedSchedule } from "@/components/home/EstimatedScheduel";
import { TopUpcoming } from "@/components/home/TopUpcoming";
import { LatestEpisodes } from "@/components/home/LatestEpisodes";
import { getHomeData } from "@/actions";
import { getUniqueAnimes } from "@/utils/helper";

export default async function Home() {
  const homePageData: HiAnime.ScrapedHomePage = await getHomeData();

  const topAiringAnimes = getUniqueAnimes(homePageData.topAiringAnimes);

  const top10Animes = {
    "top airing": topAiringAnimes.slice(0, 10),
    ...homePageData.top10Animes,
  };

  console.log(homePageData.topAiringAnimes);
  return (
    <div className="text-white flex flex-col gap-5">
      <SpotLight spotLightAnimes={homePageData.spotlightAnimes} />
      <div className="w-[90%] mx-auto">
        <Trending aniList={homePageData.trendingAnimes} />
        <TopAnimes top10Animes={top10Animes} />
        <LatestEpisodes aniList={homePageData.latestEpisodeAnimes} />
        <EstimatedSchedule />
        <TopUpcoming aniList={homePageData.topUpcomingAnimes} />
      </div>
    </div>
  );
}
