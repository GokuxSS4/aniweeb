import { HiAnime } from "aniwatch";

import { SpotLight } from "@/components/home/SpotLight";
import { Trending } from "@/components/home/Trending";
import { TopChoices } from "@/components/home/TopChoices";
import { EstimatedSchedule } from "@/components/home/EstimatedScheduel";
import { TopUpcoming } from "@/components/home/TopUpcoming";
import { LatestEpisodes } from "@/components/home/LatestEpisodes";
import { getHomeData } from "@/actions";
import { getUniqueAnimes } from "@/utils/helper";

export default async function Home() {
  const homePageData: HiAnime.ScrapedHomePage = await getHomeData();

  const topAiringAnimes = getUniqueAnimes(homePageData.topAiringAnimes);

  const top10Animes = {
    ...homePageData.top10Animes,
    "current season": topAiringAnimes.slice(0, 10),
  };

  return (
    <div className="text-white flex flex-col gap-5">
      <SpotLight spotLightAnimes={homePageData.spotlightAnimes} />
      <div className="w-[90%] mx-auto">
        <Trending aniList={homePageData.trendingAnimes} />
        <TopChoices top10Animes={top10Animes} />
        <LatestEpisodes aniList={homePageData.latestEpisodeAnimes} />
        <EstimatedSchedule />
        <TopUpcoming aniList={homePageData.topUpcomingAnimes} />
      </div>
    </div>
  );
}
