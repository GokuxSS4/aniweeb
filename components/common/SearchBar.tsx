"use client";

import { getSearchSuggestion } from "@/actions";
import { HiAnime } from "aniwatch";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

interface AnimeItemProps {
  anime: HiAnime.AnimeSearchSuggestion;
}

function AnimeItem({ anime }: AnimeItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-slate-800/50 transition-colors cursor-pointer border-b border-white-20">
      <div className="flex-shrink-0 w-[50px] aspect-[2/3]">
        <img
          src={anime.poster || ""}
          alt={anime.name || "Anime poster"}
          className="rounded-md h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1 justify-between">
        <p className="text-white font-medium line-clamp-1">{anime.name}</p>
        <p className="text-gray-400 line-clamp-1">{anime.jname}</p>
        <div className="flex gap-2 text-gray-400 text-sm line-clamp-2">
          {anime.moreInfo.map((info: string, index: number) => {
            return (
              <span key={index} className="flex gap-2">
                {info}{" "}
                {index != anime.moreInfo.length - 1 && <span>&#8226; </span>}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SearchBar() {
  const [searchAnime, setSearchAnime] = useState("");
  const [suggestedAnimes, setSuggestedAnimes] = useState<
    HiAnime.AnimeSearchSuggestion[]
  >([]);

  const isShowResult = suggestedAnimes.length > 0;

  useEffect(() => {
    async function getAnimeSuggestion(searchAnime: string) {
      const trimmedAnimeName = searchAnime.trim();

      try {
        if (trimmedAnimeName.length !== 0) {
          const result = await getSearchSuggestion(trimmedAnimeName);
          setSuggestedAnimes(result);
        } else {
          setSuggestedAnimes([]);
        }
      } catch (error) {
        console.error("Failed to fetch anime suggestions:", error);
      }
    }

    getAnimeSuggestion(searchAnime);
  }, [searchAnime]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchAnime(e.target.value);
  }

  function clearSearch() {
    setSearchAnime("");
    setSuggestedAnimes([]);
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search anime..."
        onChange={handleChange}
        value={searchAnime}
        className={`w-full bg-[#18191c] text-white placeholder-gray-400 pl-10 pr-10 py-2.5 outline-none ${
          isShowResult ? "rounded-t-md" : "rounded-md"
        }`}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <CiSearch className="h-5 w-5 text-gray-400" />
      </div>
      {searchAnime && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
        >
          <MdClear className="h-5 w-5" />
        </button>
      )}

      {isShowResult && (
        <div className="absolute w-full">
          <div className="w-full bg-black border border-white-20">
            {suggestedAnimes.map((anime) => (
              <AnimeItem key={anime.id} anime={anime} />
            ))}
          </div>
          <button className="flex gap-1 w-full p-3 justify-center items-center bg-primary  text-white rounded-b-md">
            <span>Show all results</span>
            <MdKeyboardArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
