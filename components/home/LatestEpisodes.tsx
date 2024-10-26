import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";

type TrendingAnime = HiAnime.hianime_TrendingAnime;

function AniCard({ anime }: any) {
  return (
    <div className="flex flex-col w-[200px] h-[300px] gap-2">
      <div className="w-full h-[90%] overflow-hidden relative">
        <img
          src={anime.poster}
          alt=""
          loading="lazy"
          className="brightness-50"
        />
        <p className="absolute top-1 left-1 font-bold text-sm px-2 bg-white-10 rounded-lg">
          {anime.type}
        </p>
        <div className="absolute flex gap-1 bottom-1 right-1 text-sm">
          {anime.episodes.sub && (
            <div className="flex justify-center items-center text-white text-sm bg-purple-500 px-1 rounded-md gap-1">
              <div>
                <BsBadgeCc />
              </div>
              <div>{anime.episodes.sub}</div>
            </div>
          )}
          {anime.episodes.dub && (
            <div className="flex justify-center items-center text-white bg-blue-500 px-1 rounded-md gap-1">
              <div>
                <MdMicNone />
              </div>
              <div>{anime.episodes.dub}</div>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="line-clamp-1 ">{anime.name}</p>
      </div>
    </div>
  );
}

export function LatestEpisodes({ aniList }: { aniList: any }) {
  console.log(aniList);
  return (
    <div className="w-full h-full p-3">
      <div className="inline-flex gap-2 items-stretch mb-4">
        <div className="flex-grow w-2 bg-purple-500 rounded-full"></div>
        <p className="text-2xl font-bold">Latest Episode</p>
      </div>
      <div className="grid grid-cols-6 gap-6">
        {aniList.map((anime: any, index: number) => {
          return <AniCard key={index} anime={anime} />;
        })}
      </div>
    </div>
  );
}
