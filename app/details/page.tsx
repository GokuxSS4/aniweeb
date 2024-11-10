import { HiAnime } from "aniwatch";
import { getAnimeDetails } from "@/app/details/action";
import { RecomendedAnime } from "@/components/details/RecomendedAnime";
import { Overview } from "@/components/details/Overview";
import { RelatedAnime } from "@/components/details/RelatedAnime";
import { Seasons } from "@/components/details/Seasons";
import { LeadCharacters } from "@/components/details/LeadCharacters";

export default async function AnimeDetails({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const animeId = searchParams.animeId as string;

  const animeDetails: HiAnime.ScrapedAnimeAboutInfo = await getAnimeDetails(
    animeId
  );

  return (
    <div className="w-[90%] mx-auto text-white">
      <Overview animeInfo={animeDetails.anime} />
      <Seasons animeSeasons={animeDetails.seasons} />
      <LeadCharacters
        leadCharacters={animeDetails.anime.info.charactersVoiceActors}
      />
      <RelatedAnime relatedAnimes={animeDetails.relatedAnimes} />
      <RecomendedAnime recomendedAnimes={animeDetails.recommendedAnimes} />
    </div>
  );
}
