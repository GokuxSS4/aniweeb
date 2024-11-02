import Link from "next/link";

import { HiAnime } from "aniwatch";

import { Header } from "@/components/common/Header";
import { AniCard } from "@/components/home/LatestEpisodes";

export function TopUpcoming({
  aniList,
}: {
  aniList: HiAnime.TopUpcomingAnime[];
}) {
  return (
    <div className="w-full h-full">
      <Header title={"Top Upcoming"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {aniList.map((anime: HiAnime.TopUpcomingAnime, index: number) => {
          return (
            <Link href={`details?animeId=${anime.id}`}>
              <AniCard key={index} anime={anime} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
