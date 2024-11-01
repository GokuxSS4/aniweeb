import { HiAnime } from "aniwatch";
import { Header } from "@/components/common/Header";
import { AniCard } from "@/components/home/LatestEpisodes";



export function RecomendedAnime({recomendedAnimes}:{recomendedAnimes:HiAnime.RecommendedAnime[]}){
    return (
        <div>
          <Header title={"Recommendations"} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-6">
            {recomendedAnimes.map((anime: HiAnime.Anime, index: number) => {
              return <AniCard key={index} anime={anime} />;
            })}
          </div>
        </div>
      );
}