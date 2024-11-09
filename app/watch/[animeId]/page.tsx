import { HiAnime } from "aniwatch";

import { getAnimeEpisodes } from "@/app/watch/actions";

import { AnimeOverView, WatchContainer } from "@/components/watch/WatchContainer";
import { getAnimeDetails } from "@/app/details/action";
import { RelatedAnime } from "@/components/details/RelatedAnime";
import { RecomendedAnime } from "@/components/details/RecomendedAnime";
import { LeadCharacters } from "@/components/details/LeadCharacters";

export default async function WatchAnime({
  params
}: {
  params: { animeId: string };
}) {
  const animeEpisodes: HiAnime.ScrapedAnimeEpisodes = await getAnimeEpisodes(
    params.animeId
  );

  const animeDetails: HiAnime.ScrapedAnimeAboutInfo = await getAnimeDetails(
    params.animeId
  );

  return (
    <div className="w-[90%] mx-auto text-white ">
      <WatchContainer animeEpisodes={animeEpisodes} />
      <AnimeOverView animeInfo={animeDetails.anime}/>

      <LeadCharacters
        leadCharacters={animeDetails.anime.info.charactersVoiceActors}
      />
      <RelatedAnime relatedAnimes={animeDetails.relatedAnimes} />
      <RecomendedAnime recomendedAnimes={animeDetails.recommendedAnimes} />
    </div>
  );
}
