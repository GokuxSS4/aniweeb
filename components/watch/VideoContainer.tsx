/* eslint-disable no-nested-ternary */
"use client";

import React from "react";

import { HiAnime } from "aniwatch";
import { useEffect, useState } from "react";
import { BsBadgeCc, BsFileEarmark } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import {
  VidstackDefaultPlayer,
  VidStackPlayerSkeleton,
} from "./VidstackDefaultPlayer";

import { useSettings } from "./VideoSettingsProvider";

type ServerInfoType = {
  watchCategory: "sub" | "dub" | "raw";
  serverName: HiAnime.AnimeServers;
};

export function VideoContainer({
  currentEpisode,
  isVideoSkeletonVisible,
  handleVideoSkeletonVisibilty,
  animeEpisodes,
  handleCurrentEpisode,
}: {
  currentEpisode: string;
  isVideoSkeletonVisible: boolean;
  handleVideoSkeletonVisibilty: (isVisible: boolean) => void;
  animeEpisodes: HiAnime.ScrapedAnimeEpisodes;
  handleCurrentEpisode: (episode: string) => void;
}) {
  const [availableServers, setAvailableServers] =
    useState<HiAnime.ScrapedEpisodeServers | null>(null);
  const [selectedServer, setSelectedServer] = useState<ServerInfoType | null>(
    null,
  );
  const [serverResources, setServerResources] = useState<any | null>(null);

  const [isServerResourceError, setIsServerResourceError] = useState(false);

  const [isCurrentVideoEnded, setIsCurrentVideoEnded] = useState(false);

  const { settings, setSettings } = useSettings();
  const { autoPlay, autoNext, autoSkip } = settings;

  const title = animeEpisodes.episodes.find(
    (episode) => episode.episodeId === currentEpisode,
  )?.title;

  const toggleAutoPlay = () =>
    setSettings({ ...settings, autoPlay: !autoPlay });
  const toggleAutoNext = () =>
    setSettings({ ...settings, autoNext: !autoNext });
  const toggleAutoSkip = () =>
    setSettings({ ...settings, autoSkip: !autoSkip });

  const handlePrevEpisode = () => {
    const { episodes } = animeEpisodes;
    const firstEpisode = episodes[0]?.episodeId;

    if (currentEpisode !== firstEpisode) {
      const currentEpisodeIndex = episodes.findIndex(
        (episode) => episode.episodeId === currentEpisode,
      );

      if (currentEpisodeIndex !== -1 && currentEpisodeIndex > 0) {
        const previoudEpisodeId = episodes[currentEpisodeIndex - 1].episodeId;
        if (previoudEpisodeId) {
          handleCurrentEpisode(previoudEpisodeId);
          setIsCurrentVideoEnded(false);
          setServerResources(null);
          handleVideoSkeletonVisibilty(true);
        }
      }
    }
  };

  const handleNextEpisode = () => {
    const { totalEpisodes, episodes } = animeEpisodes;
    const lastEpisode = episodes[totalEpisodes - 1]?.episodeId;

    if (currentEpisode !== lastEpisode) {
      const currentEpisodeIndex = episodes.findIndex(
        (episode) => episode.episodeId === currentEpisode,
      );

      if (
        currentEpisodeIndex !== -1 &&
        currentEpisodeIndex < totalEpisodes - 1
      ) {
        const nextEpisodeId = episodes[currentEpisodeIndex + 1].episodeId;
        if (nextEpisodeId) {
          handleCurrentEpisode(nextEpisodeId);
          setIsCurrentVideoEnded(false);
          setServerResources(null);
          handleVideoSkeletonVisibilty(true);
        }
      }
    }
  };

  function getFirstServer(
    aniServer?: HiAnime.ScrapedEpisodeServers,
    category?: "sub" | "dub" | "raw",
  ): ServerInfoType | null {
    if (!aniServer) return null;

    if (category) {
      if (aniServer[category]?.length) {
        return {
          watchCategory: category,
          serverName: aniServer[category][0].serverName as HiAnime.AnimeServers,
        };
      }
    }

    if (aniServer.sub?.length) {
      return {
        watchCategory: "sub",
        serverName: aniServer.sub[0].serverName as HiAnime.AnimeServers,
      };
    }
    if (aniServer.dub?.length) {
      return {
        watchCategory: "dub",
        serverName: aniServer.dub[0].serverName as HiAnime.AnimeServers,
      };
    }
    if (aniServer.raw?.length) {
      return {
        watchCategory: "raw",
        serverName: aniServer.raw[0].serverName as HiAnime.AnimeServers,
      };
    }
    return null;
  }

  useEffect(() => {
    if (
      animeEpisodes &&
      animeEpisodes.episodes?.length > 0 &&
      isCurrentVideoEnded
    ) {
      handleNextEpisode();
    }
  }, [animeEpisodes, currentEpisode, isCurrentVideoEnded]);

  // Fetch Available Servers
  useEffect(() => {
    const abortController = new AbortController();

    const fetchServers = async () => {
      try {
        const response = await fetch(
          `/api/anime/servers?animeEpisode=${encodeURIComponent(currentEpisode)}`,
          { signal: abortController.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch servers");
        }

        const servers = await response.json();

        if (!abortController.signal.aborted) {
          setAvailableServers(servers);
          setIsServerResourceError(false);
        }
      } catch (error) {
        const err = error as Error;
        if (err.name !== "AbortError") {
          setIsServerResourceError(true);
        }
      }
    };

    fetchServers();

    return () => {
      abortController.abort();
    };
  }, [currentEpisode]);

  // Select Initial Server
  useEffect(() => {
    if (availableServers) {
      const initialServer = getFirstServer(
        availableServers,
        settings.defaultLanguage,
      );
      setSelectedServer(initialServer);
    }
  }, [availableServers]);

  // Fetch Server Resources
  useEffect(() => {
    const abortController = new AbortController();

    const fetchResources = async () => {
      if (!selectedServer) {
        setServerResources(null);
        return;
      }

      try {
        const response = await fetch(
          `/api/anime/sources?${new URLSearchParams({
            animeEpisode: currentEpisode,
            serverName: selectedServer.serverName,
            category: selectedServer.watchCategory,
          })}`,
          { signal: abortController.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch server resources");
        }

        const resources = await response.json();

        if (!abortController.signal.aborted) {
          // const proxy_url =
          //   process.env.NODE_ENV === "production"
          //     ? "https://proxy.aniweeb.com"
          //     : "https://hls_proxy:8080";

          const proxy_url = "https://proxy.aniweeb.com";

          const file_extension = ".m3u8";

          if (process.env.NODE_ENV === "production") {
            resources.sources = resources.sources
              .filter((source: any) => source.type === "hls")
              .map((source: any) => {
                const encodedUrl = btoa(source.url);
                return {
                  ...source,
                  url: `${proxy_url}/${encodedUrl}${file_extension}`,
                };
              });
          }

          setServerResources(resources);
          handleVideoSkeletonVisibilty(false);
          setIsServerResourceError(false);
        }
      } catch (error) {
        const err = error as Error;
        if (err.name !== "AbortError") {
          setIsServerResourceError(true);
        }
      }
    };

    fetchResources();

    return () => {
      abortController.abort();
    };
  }, [selectedServer, currentEpisode]);

  const renderServerButtons = (
    servers: any[],
    category: "sub" | "dub" | "raw",
    icon?: React.ReactNode,
  ) => (
    <div className="w-full flex  flex-1 gap-5 px-4 py-2 justify-start items-center">
      <div className="px-2 py-1 text-sm flex gap-2 items-center justify-center">
        {icon}
        <span className="uppercase">{category}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {servers.map((server) => (
          <button
            key={server.serverName}
            className={`px-4 py-1 text-sm uppercase rounded-md ${
              selectedServer?.watchCategory === category &&
              selectedServer.serverName === server.serverName
                ? "bg-primary"
                : "bg-secondary hover:bg-[#272770] transition-colors"
            }`}
            onClick={() => {
              setSelectedServer({
                watchCategory: category,
                serverName: server.serverName as HiAnime.AnimeServers,
              });
              setSettings({ ...settings, defaultLanguage: category });
              setServerResources(null);
              setIsServerResourceError(false);
            }}
          >
            {server.showServerName}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col">
      <div className="relative aspect-video w-full mb-2 rounded-lg">
        {isServerResourceError ? (
          <div className="w-full h-full relative bg-gray-300 rounded-lg border border-white/20">
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black">
              Failed to retrieve
            </p>
            <VidStackPlayerSkeleton />
          </div>
        ) : serverResources && !isVideoSkeletonVisible ? (
          <div className="w-full h-full flex border border-white/20 rounded-lg">
            <VidstackDefaultPlayer
              title={title || ""}
              videoUrl={serverResources.sources[0].url}
              subtitleUrls={serverResources.tracks.filter(
                (track: any) => track.kind === "captions",
              )}
              introTiming={serverResources.intro}
              outroTiming={serverResources.outro}
              onVideoEnd={() => setIsCurrentVideoEnded(true)}
              autoPlay={autoPlay}
              autoNext={autoNext}
              autoSkip={autoSkip}
            />
          </div>
        ) : (
          <div className="w-full h-full  flex animate-pulse bg-gray-700 rounded-lg border border-white/20">
            <VidStackPlayerSkeleton />
          </div>
        )}
      </div>

      <div className="bg-[#0f0f11] flex flex-wrap gap-2 md:gap-4 px-2 py-1 rounded-lg text-xs border border-white/20">
        <button
          className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
          onClick={toggleAutoPlay}
        >
          {autoPlay ? (
            <FaCheck className="text-blue-400 text-xs" />
          ) : (
            <RiCheckboxBlankFill className="text-xs" />
          )}{" "}
          Auto Play
        </button>

        <button
          className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
          onClick={toggleAutoSkip}
        >
          {autoSkip ? (
            <FaCheck className="text-blue-400 text-xs" />
          ) : (
            <RiCheckboxBlankFill className="text-xs" />
          )}{" "}
          Auto Skip
        </button>

        <button
          className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
          onClick={toggleAutoNext}
        >
          {autoNext ? (
            <FaCheck className="text-blue-400 text-xs" />
          ) : (
            <RiCheckboxBlankFill className="text-xs" />
          )}{" "}
          Auto Next
        </button>

        <button
          className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
          onClick={handlePrevEpisode}
        >
          <TbPlayerTrackPrev className="text-xs" /> Prev
        </button>

        <button
          className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
          onClick={handleNextEpisode}
        >
          <TbPlayerTrackNext className="text-xs" /> Next
        </button>
      </div>

      <div className="">
        {availableServers !== null ? (
          <div className="bg-[rgb(15,14,15)] rounded-lg mt-4 overflow-hidden border border-white/20">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-[250px] p-6 bg-gray-900/50">
                <div className="flex flex-col items-center text-center gap-2">
                  <p className="text-sm text-gray-400">You are watching</p>
                  <p className="text-xl font-bold text-white">
                    Episode {availableServers?.episodeNo}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    If current server doesn't work please try other servers
                    beside
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center divide-y divide-gray-800">
                {availableServers && (
                  <>
                    {availableServers.sub?.length > 0 &&
                      renderServerButtons(
                        availableServers.sub,
                        "sub",
                        <BsBadgeCc className="size-5" />,
                      )}

                    {availableServers.dub?.length > 0 &&
                      renderServerButtons(
                        availableServers.dub,
                        "dub",
                        <MdMicNone className="size-5" />,
                      )}

                    {availableServers.raw?.length > 0 &&
                      renderServerButtons(
                        availableServers.raw,
                        "raw",
                        <BsFileEarmark className="size-5" />,
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg mt-4 border border-gray-800 animate-pulse transform transition-transform duration-500 bg-gray-700">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-[250px] p-6 bg-gray-900/50">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-4 w-24 "></div>
                  <div className="h-6 w-32 "></div>
                  <div className="h-12 w-40 mt-2"></div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center divide-y divide-gray-800">
                <div className="p-4"></div>

                <div className="p-4"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
