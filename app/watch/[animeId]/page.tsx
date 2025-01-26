import { HiAnime } from "aniwatch";

import { getAnimeEpisodes } from "@/app/watch/actions";

import {
  AnimeOverView,
  WatchContainer,
} from "@/components/watch/WatchContainer";
import { getAnimeDetails } from "@/app/details/action";
import { RelatedAnime } from "@/components/details/RelatedAnime";
import { RecomendedAnime } from "@/components/details/RecomendedAnime";
import { LeadCharacters } from "@/components/details/LeadCharacters";
import { Metadata } from "next";
import { cache } from "react";

const wrapperOfGetAnimeDetails = cache(async (animeId: string) => {
  const animeDetails: HiAnime.ScrapedAnimeAboutInfo =
    await getAnimeDetails(animeId);

  return animeDetails;
});

export async function generateMetadata({
  params,
}: {
  params: { animeId: string };
}): Promise<Metadata> {
  const animeId = params.animeId as string;
  const animeDetails = await wrapperOfGetAnimeDetails(animeId);

  return {
    title: `Watch ${animeDetails.anime.info.name}`,
    description: `Best site to watch ${animeDetails.anime.info.name} English Sub/Dub online Free and download ${animeDetails.anime.info.name} English Sub/Dub anime.`,
  };
}

export default async function WatchAnime({
  params,
}: {
  params: { animeId: string };
}) {
  const animeEpisodes: HiAnime.ScrapedAnimeEpisodes = await getAnimeEpisodes(
    params.animeId,
  );

  const animeDetails: HiAnime.ScrapedAnimeAboutInfo =
    await wrapperOfGetAnimeDetails(params.animeId);

  return (
    <div className="w-[90%] mx-auto text-white ">
      <WatchContainer animeEpisodes={animeEpisodes} />
      <AnimeOverView animeInfo={animeDetails.anime} />

      <LeadCharacters
        leadCharacters={animeDetails.anime.info.charactersVoiceActors}
      />
      <RelatedAnime relatedAnimes={animeDetails.relatedAnimes} />
      <RecomendedAnime recomendedAnimes={animeDetails.recommendedAnimes} />
    </div>
  );
}
