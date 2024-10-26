import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { Header } from "@/components/Header";

export function AniCard({ anime }: any) {
  return (
    <div className="flex flex-col w-[calc(16.66% - 1rem)] gap-2">
      <div className="w-full aspect-[2/3] overflow-hidden relative">
        <img
          src={anime.poster}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover
          "
        />

        {
          anime.rating && ( <div className="absolute top-2 right-2">
            <div className="bg-orange-600 px-2 py-1 rounded-md text-white  text-xs">
              <p>{anime.rating}</p>
            </div>
          </div>
          )
        }

        <div className="absolute flex gap-1 bottom-2 right-1 text-xs">
          {anime.episodes.sub && (
            <div className="flex justify-center items-center text-white  bg-purple-500 px-1 rounded-md gap-1">
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
      <div className="flex flex-col gap-1">
        <p className="line-clamp-1 ">{anime.name}</p>
        <div className="flex text-sm gap-2 text-gray-400">
          <p>{anime.type}</p>
          <span>&#8226; </span>
          <p>{anime.duration}</p>
        </div>
      </div>
    </div>
  );
}

export function LatestEpisodes({ aniList }: { aniList: any }) {
  return (
    <div className="w-full h-full p-3">
      <Header title={"Latest Episode"} />
      <div className="grid grid-cols-6 gap-6">
        {aniList.map((anime: any, index: number) => {
          return <AniCard key={index} anime={anime} />;
        })}
      </div>      
    </div>
  );
}
