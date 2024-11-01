import { HiAnime } from "aniwatch";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";

import { Header } from "@/components/common/Header";

export function AniCard({ anime }: { anime: HiAnime.Anime }) {
  return (
    <div className="flex flex-col w-[calc(16.66% - 1rem)] gap-2">
      <div className="w-full aspect-[2/3] overflow-hidden relative">
        <img
          src={anime?.poster || ""}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />

        {anime.rating && (
          <div className="absolute top-2 right-2 text-xs">
            <div className="bg-orange-600 px-1.5 py-0.5 rounded text-white ">
              <p>{anime.rating}</p>
            </div>
          </div>
        )}

        <div className="absolute flex gap-1 bottom-2 right-1 text-xs">
          {anime.episodes.sub && (
            <div className="flex items-center text-white text-xs bg-primary px-1.5 py-0.5 rounded gap-0.5">
              <BsBadgeCc className="w-3 h-3" />
              <span>{anime.episodes.sub}</span>
            </div>
          )}
          {anime.episodes.dub && (
            <div className="flex items-center text-white text-xs bg-secondary px-1.5 py-0.5 rounded gap-0.5">
              <MdMicNone className="w-3 h-3" />
              <span>{anime.episodes.dub}</span>
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

export function LatestEpisodes({
  aniList,
}: {
  aniList: HiAnime.LatestEpisodeAnime[];
}) {
  return (
    <div className="w-full h-full">
      <Header title={"Latest Episode"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-6">
        {aniList.map((anime: HiAnime.Anime, index: number) => {
          return <AniCard key={index} anime={anime} />;
        })}
      </div>
    </div>
  );
}
