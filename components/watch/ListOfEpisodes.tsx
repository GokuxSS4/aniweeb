"use client";

import { HiAnime } from "aniwatch";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";

function getListOfEpisodes(
  totalEpisodes: number,
  episodes: HiAnime.AnimeEpisode[]
) {
  const result: Record<string, HiAnime.AnimeEpisode[]> = {};
  let start = 1;

  while (start <= totalEpisodes) {
    const end = Math.min(start + 99, totalEpisodes);
    const filterEpisodes = episodes.filter(
      (episode) => episode.number >= start && episode.number <= end
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
}: {
  animeEpisodes: HiAnime.ScrapedAnimeEpisodes;
  currentEpisode: string;
  handleCurrentEpisode: (episode: string) => void;
}) {
  const totlaEpisodes = animeEpisodes.totalEpisodes;
  const listOfEpisodes = getListOfEpisodes(
    totlaEpisodes,
    animeEpisodes.episodes
  );
  const episodesCategory = Object.keys(listOfEpisodes);
  const [selectedCategory, setSelectedCategory] = useState(episodesCategory[0]);

  return (
    <div className="flex flex-col gap-3 border-2 border-white-10 p-4 rounded-lg">
      <div className="relative inline-block text-left">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-[50%] bg-white border border-gray-300 rounded-md shadow-sm px-1 py-1 text-base font-medium text-gray-700 focus:outline-none"
        >
          {episodesCategory.map((episode, index) => (
            <option key={index} value={episode}>
              {episode}
            </option>
          ))}
        </select>
      </div>
      <div
        className={`grid ${
          totlaEpisodes <= 100 ? "grid-cols-1" : "grid-cols-5 md:grid-cols-10 lg:grid-cols-5"
        } gap-3`}
      >
        {listOfEpisodes[selectedCategory].map((episode) => {
          return (
            <button
              key={episode.number}
              className={`py-1 px-1 rounded-md flex gap-4 items-center ${
                totlaEpisodes <= 100 ? "justify-start" : "justify-center"
              } ${episode.isFiller ? "bg-orange-600" : "bg-gray-500"} ${
                currentEpisode == episode.episodeId && "bg-purple-500"
              }`}
              onClick={() => {
                handleCurrentEpisode(episode.episodeId as string);
              }}
            >
              {currentEpisode == episode.episodeId ? (
                <FaPlay />
              ) : (
                episode.number
              )}
              {totlaEpisodes <= 100 && <span className="line-clamp-1">{episode.title}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
