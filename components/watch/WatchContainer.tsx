"use client";
import Image from "next/image";

import { HiAnime } from "aniwatch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ListOfEpisodes } from "./ListOfEpisodes";
import { VideoContainer } from "./VideoContainer";

import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { ExpandableParagraphs } from "../common/ExpandableParagraph";
import { VideoSettingsProvider } from "./VideoSettingsProvider";
import { getInRecentWatches, setInRecentWatches } from "@/utils/helper";

export function AnimeOverView({
  animeInfo,
}: {
  animeInfo: HiAnime.ScrapedAnimeAboutInfo["anime"];
}) {
  return (
    <div className="flex flex-row gap-3 md:gap-8 pt-10">
      <div className="w-[80px] h-[150px] md:w-[160px] md:h-[240px] flex-shrink-0">
        <div className="w-full h-full overflow-hidden relative">
          <Image
            src={animeInfo.info.poster || ""}
            alt={animeInfo.info.name || ""}
            fill
            className="w-full h-full object-cover rounded overflow-hidden"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-start p-2">
        <h1 className="text-xl font-bold">{animeInfo.info.name}</h1>
        <div
          className="flex  flex-wrap   gap-3 text-xs items-center
            "
        >
          <p className="px-1.5 py-0.5 rounded  bg-white-10">
            {animeInfo.info.stats.rating}
          </p>
          <p className="px-1.5 py-0.5 rounded  bg-yellow-600">
            {animeInfo.info.stats.quality}
          </p>
          {animeInfo.info.stats.episodes.sub && (
            <div className="flex items-center text-white  bg-primary px-1.5 py-0.5 rounded gap-0.5">
              <BsBadgeCc className="w-3 h-3" />
              <span>{animeInfo.info.stats.episodes.sub}</span>
            </div>
          )}
          {animeInfo.info.stats.episodes.dub && (
            <div className="flex items-center text-white  bg-secondary px-1.5 py-0.5 rounded gap-0.5">
              <MdMicNone className="w-3 h-3" />
              <span>{animeInfo.info.stats.episodes.dub}</span>
            </div>
          )}
          <span className="py-0.5">&#8226; </span>
          <p className="py-0.5">{animeInfo.info.stats.type}</p>
          <span className="py-0.5">&#8226; </span>
          <p className="py-0.5">{animeInfo.info.stats.duration}</p>
        </div>
        <div className="flex flex-col ">
          {animeInfo.info.description && (
            <ExpandableParagraphs
              paragraphs={animeInfo.info.description.split("\n\n")}
              maxHeight={70}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function WatchContainer({
  animeEpisodes,
  animeId,
}: {
  animeEpisodes: HiAnime.ScrapedAnimeEpisodes;
  animeId: string;
}) {
  const [currentEpisode, setCurrentEpisode] = useState(
    getInRecentWatches(animeId) || animeEpisodes.episodes[0].episodeId,
  );
  const [title, setTitle] = useState(animeEpisodes.episodes[0].title);

  const [isVideoSkeletonVisible, setIsVideoSkeletonVisible] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.push(currentEpisode as string);
    setInRecentWatches(currentEpisode as string, animeId);
  }, [currentEpisode]);

  return (
    <div className="pt-6 flex gap-6 flex-col lg:flex-row lg:pt-24">
      <div className="flex-1 flex flex-col gap-6">
        <VideoSettingsProvider>
          <VideoContainer
            title={title as string}
            isVideoSkeletonVisible={isVideoSkeletonVisible}
            handleVideoSkeletonVisibilty={setIsVideoSkeletonVisible}
            currentEpisode={currentEpisode as string}
            animeEpisodes={animeEpisodes}
            handleCurrentEpisode={setCurrentEpisode}
          />
        </VideoSettingsProvider>
      </div>
      <div className="w-full lg:w-1/4">
        <ListOfEpisodes
          animeEpisodes={animeEpisodes}
          currentEpisode={currentEpisode as string}
          handleCurrentEpisode={setCurrentEpisode}
          handleVideoSkeletonVisibilty={setIsVideoSkeletonVisible}
          handleTitle={setTitle}
        />
      </div>
    </div>
  );
}
