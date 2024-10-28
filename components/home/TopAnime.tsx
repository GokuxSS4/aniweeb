"use client";

import { useEffect, useState } from "react";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { HiAnime } from "aniwatch";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Header } from "@/components/common/Header";

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
  return (
    <div className="flex flex-col w-full">
      <h2 className="capitalize text-xl font-semibold text-center pb-4">
        {title}
      </h2>

      <div className="flex flex-col w-full">
        {topAnime.map((anime: TopAnimeType) => (
          <div
            className="flex p-4 gap-4 border-b border-gray-500"
            key={anime.id}
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
        ))}
      </div>
    </div>
  );
}

export function TopAnimes({ top10Animes }: { top10Animes: Top10AnimesType }) {
  const topCategory = Object.keys(top10Animes) as Top10AnimesTypeKeys[];

  return (
    <div className="w-full">
      <Header title="Top Anime" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topCategory.map((category: Top10AnimesTypeKeys) => (
          <TopAnime
            key={category}
            topAnime={top10Animes[category]}
            title={category}
          />
        ))}
      </div>
    </div>
  );
}
