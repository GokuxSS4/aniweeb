"use client";

import { HiAnime } from "aniwatch";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";

function getListOfEpisodes(
  totalEpisodes: number,
  episodes: HiAnime.AnimeEpisode[],
) {
  const result: Record<string, HiAnime.AnimeEpisode[]> = {};
  let start = 1;

  while (start <= totalEpisodes) {
    const end = Math.min(start + 99, totalEpisodes);
    const filterEpisodes = episodes.filter(
      (episode) => episode.number >= start && episode.number <= end,
    );
    result[`Eps: ${start}-${end}`] = filterEpisodes;
    start += 100;
  }

  return result;
}

export function ListOfEpisodes({
  animeEpisodes,
  currentEpisode,
  handleCurrentEpisode,
  handleVideoSkeletonVisibilty,
}: {
  animeEpisodes: HiAnime.ScrapedAnimeEpisodes;
  currentEpisode: string;
  handleCurrentEpisode: (episode: string) => void;
  handleVideoSkeletonVisibilty: (isVisible: boolean) => void;
}) {
  const totlaEpisodes = animeEpisodes.totalEpisodes;
  const listOfEpisodes = getListOfEpisodes(
    totlaEpisodes,
    animeEpisodes.episodes,
  );
  const episodesCategory = Object.keys(listOfEpisodes);

  const currentEpisodeNumber = animeEpisodes.episodes.findIndex(
    (episode) => episode.episodeId === currentEpisode,
  );
  const currentCategoryIndex = parseInt(
    (currentEpisodeNumber / 100).toString(),
    10,
  );

  const [selectedCategory, setSelectedCategory] = useState(
    episodesCategory[currentCategoryIndex],
  );

  return (
    <div className="flex flex-col gap-3 border border-white/20 p-2 rounded-lg">
      <div className="relative inline-block text-left">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-[50%] bg-[#0f0f11] border border-white/20 rounded-md shadow-sm px-1 py-1 text-base font-medium text-white focus:outline-none"
        >
          {episodesCategory.map((episode, index) => (
            <option key={index} value={episode}>
              {episode}
            </option>
          ))}
        </select>
      </div>
      <div className={"grid grid-cols-5 md:grid-cols-10 lg:grid-cols-5 gap-2"}>
        {listOfEpisodes[selectedCategory].map((episode) => {
          return (
            <button
              key={episode.number}
              className={`p-1 rounded-md flex gap-3 items-center  justify-center ${episode.isFiller ? "bg-orange-600" : "bg-[#0f0f11]"} ${
                currentEpisode === episode.episodeId && "bg-purple-500"
              }`}
              onClick={() => {
                handleCurrentEpisode(episode.episodeId as string);
                handleVideoSkeletonVisibilty(true);
              }}
            >
              {currentEpisode === episode.episodeId ? (
                <FaPlay />
              ) : (
                episode.number
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
