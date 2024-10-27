import { SpotLight } from "@/components/home/SpotLight";
import { Trending } from "@/components/home/Trending";
import { Top10Anime } from "@/components/home/Top10Anime";
import { getHomeData } from "@/data/homePage";
import { EstimatedSchedule } from "@/components/home/EstimatedScheduel";
import { TopUpcoming } from "@/components/home/TopUpcoming";
import { LatestEpisodes } from "@/components/home/LatestEpisodes";
import { Footer } from "@/components/Footer";

export default async function Home() {
  const homePageData = await getHomeData();

  if (homePageData.error) {
    throw new Error(
      "The service is temporarily unavailable. Please try again later."
    );
  }
  // console.log(homePageData);
  return (
    <div className="text-white flex flex-col gap-5">
      <SpotLight
        spotLightAnimes={homePageData.homePageDetails.spotlightAnimes}
      />
      <div className="w-10/12 mx-auto">
        <Trending aniList={homePageData.homePageDetails.trendingAnimes} />
        <Top10Anime top10Details={homePageData.top10AnimeData} />
        <LatestEpisodes
          aniList={homePageData.homePageDetails.latestEpisodeAnimes}
        />
        <EstimatedSchedule />
        <TopUpcoming aniList={homePageData.homePageDetails.topUpcomingAnimes} />
      </div>
    </div>
  );
}
