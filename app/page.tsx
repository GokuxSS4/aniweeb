import { SpotLight } from "@/components/home/SpotLight";
import { Trending } from "@/components/home/Trending";
import { TopAnimes } from "@/components/home/TopAnime";
import { EstimatedSchedule } from "@/components/home/EstimatedScheduel";
import { TopUpcoming } from "@/components/home/TopUpcoming";
import { LatestEpisodes } from "@/components/home/LatestEpisodes";
import { getHomeData } from "@/actions";


export default async function Home() {
  const homePageData = await getHomeData();

  if (homePageData.error) {
    throw new Error(
      "The service is temporarily unavailable. Please try again later."
    );
  }

  return (
    <div className="text-white flex flex-col gap-5">
      <SpotLight
        spotLightAnimes={homePageData.spotlightAnimes}
      />
      <div className="w-[90%] mx-auto">
        <Trending aniList={homePageData.trendingAnimes} />
        <TopAnimes top10Animes={homePageData.top10Animes} />
        <LatestEpisodes
          aniList={homePageData.latestEpisodeAnimes}
        />
        <EstimatedSchedule />
        <TopUpcoming aniList={homePageData.topUpcomingAnimes} />
      </div>
    </div>
  );
}
