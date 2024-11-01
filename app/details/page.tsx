import { HiAnime } from "aniwatch";
import { getAnimeDetails } from "@/app/details/action";
import { RecomendedAnime } from "@/components/details/RecomendedAnime";
import { Overview } from "@/components/details/Overview";

export default async function AnimeDetails({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const animeId = searchParams.animeId as string;

  const animeDetails: HiAnime.ScrapedAnimeAboutInfo = await getAnimeDetails(
    animeId
  );
  // console.log("voice actors:", animeDetails.relatedAnimes);
  // console.log("length of voice actor", animeDetails.relatedAnimes.length);
  console.log("anime", animeDetails.anime);

  return (
    <div className="w-[90%] mx-auto text-white">
      <Overview animeInfo={animeDetails.anime} />
      <RecomendedAnime recomendedAnimes={animeDetails.recommendedAnimes} />
    </div>
  );
}
