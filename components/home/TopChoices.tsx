"use client";

import Link from "next/link";

import { useState } from "react";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { HiAnime } from "aniwatch";
import { Header } from "@/components/common/Header";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type Top10AnimesType = HiAnime.ScrapedAnimeCategory["top10Animes"];
type TopAnimeType = HiAnime.Top10Anime;
type Top10AnimesTypeKeys = keyof Top10AnimesType;

function TopAnime({
  topAnime,
  title,
}: {
  topAnime: TopAnimeType[];
  title: Top10AnimesTypeKeys;
}) {
  const [isExpanded, setIsExpanded] = useState(false);


  return (
    <div className="flex flex-col w-full">
      <h2 className="capitalize text-xl font-semibold text-start pl-4 pb-4">
        {title}
      </h2>

      <div className="flex flex-col w-full">
        {topAnime.map((anime: TopAnimeType, index: number) => (
          <Link href={`details?animeId=${anime.id}`} key={anime.id}>
            <div
              className={`p-4 gap-4 border-b border-gray-500 ${
                index >= topAnime.length / 2 && !isExpanded ? "hidden" : "flex"
              }`}
            >
              <div className="flex-shrink-0 w-[50px] aspect-[2/3]">
                <img
                  src={anime.poster || ""}
                  alt={anime.name || "failed to retrieve image"}
                  className="rounded-md h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col justify-center  gap-2 min-w-0">
                <div className="line-clamp-2 break-words">{anime.name}</div>
                <div className="flex gap-2">
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
            </div>
          </Link>
        ))}
      </div>

      <div className="w-full flex justify-end lg:justify-start mt-6 pl-4">
        <button
          className="flex justify-center items-center gap-1 text-white brightness-75 hover:brightness-100"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{isExpanded ? "Show less" : "Show more"}</span>
          {isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
      </div>
    </div>
  );
}

export function TopChoices({ top10Animes }: { top10Animes: Top10AnimesType }) {
  const topCategory = Object.keys(top10Animes) as Top10AnimesTypeKeys[];

  return (
    <div className="w-full">
      <Header title="Top Choices" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topCategory.map((category: Top10AnimesTypeKeys, index: number) => (
          <TopAnime
            key={index}
            topAnime={top10Animes[category]}
            title={category}
          />
        ))}
      </div>
    </div>
  );
}
