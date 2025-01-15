/* eslint-disable no-nested-ternary */
"use client";

import React from "react";

import { HiAnime } from "aniwatch";
import { useEffect, useState } from "react";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import {
  VidstackDefaultPlayer,
  VidStackPlayerSkeleton,
} from "./VidstackDefaultPlayer";

type ServerInfoType = {
  watchCategory: "sub" | "dub" | "raw";
  serverName: HiAnime.AnimeServers;
};

function getFirstServer(
  aniServer?: HiAnime.ScrapedEpisodeServers,
): ServerInfoType | null {
  if (!aniServer) return null;

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

export function VideoContainer({
  currentEpisode,
  title,
  isVideoSkeletonVisible,
  handleVideoSkeletonVisibilty,
}: {
  currentEpisode: string;
  title: string;
  isVideoSkeletonVisible: boolean;
  handleVideoSkeletonVisibilty: (isVisible: boolean) => void;
}) {
  const [availableServers, setAvailableServers] =
    useState<HiAnime.ScrapedEpisodeServers | null>(null);
  const [selectedServer, setSelectedServer] = useState<ServerInfoType | null>(
    null,
  );
  const [serverResources, setServerResources] = useState<any | null>(null);

  const [isServerResourceError, setIsServerResourceError] = useState(false);

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
      const initialServer = getFirstServer(availableServers);
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
          const proxy_url =
            process.env.NODE_ENV === "production"
              ? "https://proxy.aniweeb.live"
              : "https://hls_proxy:8080";

          const file_extension = ".m3u8";

          resources.sources = resources.sources
            .filter((source: any) => source.type === "hls")
            .map((source: any) => {
              const encodedUrl = btoa(source.url);
              return {
                ...source,
                url: `${proxy_url}/${encodedUrl}${file_extension}`,
              };
            });

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
              setServerResources(null);
              setIsServerResourceError(false);
            }}
          >
            {server.serverName}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="relative aspect-video w-full">
        {isServerResourceError ? (
          <div className="w-full h-full relative bg-gray-300">
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black">
              Failed to retrieve
            </p>
            <VidStackPlayerSkeleton />
          </div>
        ) : serverResources && !isVideoSkeletonVisible ? (
          <div className="w-full h-full">
            <VidstackDefaultPlayer
              title={title}
              videoUrl={serverResources.sources[0].url}
              subtitleUrls={serverResources.tracks.filter(
                (track: any) => track.kind === "captions",
              )}
            />
          </div>
        ) : (
          <div className="w-full h-full animate-pulse bg-gray-700 rounded-lg">
            <VidStackPlayerSkeleton />
          </div>
        )}
      </div>

      <div>
        {availableServers !== null ? (
          <div className="bg-[rgb(15,14,15)] rounded-lg mt-4 overflow-hidden border border-gray-800">
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
                        <BsBadgeCc className="size-4" />,
                      )}

                    {availableServers.dub?.length > 0 &&
                      renderServerButtons(
                        availableServers.dub,
                        "dub",
                        <MdMicNone className="size-5" />,
                      )}

                    {availableServers.raw?.length > 0 &&
                      renderServerButtons(availableServers.raw, "raw")}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg mt-4  border border-gray-800 animate-pulse transform transition-transform duration-500 bg-gray-700">
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
