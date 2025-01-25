/* eslint-disable @typescript-eslint/no-unused-vars */
import { HiAnime } from "aniwatch";
import { getAnimeDetails } from "@/app/details/action";
import { RecomendedAnime } from "@/components/details/RecomendedAnime";
import { Overview } from "@/components/details/Overview";
import { RelatedAnime } from "@/components/details/RelatedAnime";
import { Seasons } from "@/components/details/Seasons";
import { LeadCharacters } from "@/components/details/LeadCharacters";
import { Metadata } from "next";
import { cache } from "react";

// export const metadata: Metadata = {
//   title: ""
// }

const wrapperOfGetAnimeDetails = cache(async (animeId: string) => {
  const animeDetails: HiAnime.ScrapedAnimeAboutInfo =
    await getAnimeDetails(animeId);

  return animeDetails;
});

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const animeId = searchParams.animeId as string;
  const animeDetails: HiAnime.ScrapedAnimeAboutInfo =
    await getAnimeDetails(animeId);

  return {
    title: animeDetails.anime.info.name,
    description: animeDetails.anime.info.description,
    openGraph: {
      images: [
        {
          url: animeDetails.anime.info.poster as string,
        },
      ],
    },
  };
}

export default async function AnimeDetails({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const animeId = searchParams.animeId as string;

  const animeDetails: HiAnime.ScrapedAnimeAboutInfo =
    await getAnimeDetails(animeId);

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
