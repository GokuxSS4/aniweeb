import { Header } from "@/components/common/Header";
import { AniCard } from "@/components/home/LatestEpisodes";
import { aniScraper } from "@/config/aniScraper";
import { HiAnime } from "aniwatch";
import Link from "next/link";

export default async function FilterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { keyword } = await searchParams;

  const results = await aniScraper.search(keyword, 1);

  return (
    <div className="w-[90%] mx-auto text-white">
      <div className="pt-6 lg:pt-24">
        <Header title={`Search Resuls for: ${keyword}`} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.animes.map(
            (anime: HiAnime.TopUpcomingAnime, index: number) => {
              return (
                <Link href={`details?animeId=${anime.id}`}>
                  <AniCard key={index} anime={anime} />
                </Link>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
