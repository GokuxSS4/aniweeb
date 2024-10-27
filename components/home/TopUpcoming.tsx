import { Header } from "@/components/Header";
import { AniCard } from "@/components/home/LatestEpisodes";

export function TopUpcoming({aniList}:{aniList:any}){
    return (
        <div className="w-full h-full p-3">
          <Header title={"Top Upcoming"} />
          <div className="grid grid-cols-6 gap-6">
            {aniList.map((anime: any, index: number) => {
              return <AniCard key={index} anime={anime} />;
            })}
          </div>      
        </div>
      );
}