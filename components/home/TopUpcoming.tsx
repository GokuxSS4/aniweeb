import { HiAnime } from "aniwatch";

import { Header } from "@/components/Header";
import { AniCard } from "@/components/home/LatestEpisodes";

export function TopUpcoming({aniList}:{aniList:HiAnime.TopUpcomingAnime[]}){
    return (
        <div className="w-full h-full">
          <Header title={"Top Upcoming"} />
          <div className="grid grid-cols-6 gap-6">
            {aniList.map((anime: HiAnime.TopUpcomingAnime, index: number) => {
              return <AniCard key={index} anime={anime} />;
            })}
          </div>      
        </div>
      );
}