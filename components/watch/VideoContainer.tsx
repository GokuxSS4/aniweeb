"use client";

import {
  getEpsAvailableServers,
  getEpServerResources,
} from "@/app/watch/actions";
import { HiAnime } from "aniwatch";
import { useEffect, useState } from "react";
import { VidStackPlayer, VidStackPlayerSkeleton } from "./VidStackPlayer";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { file_extension, proxy_url } from "@/utils/helper";

type ServerInfoType = {
  watchCategory: "sub" | "dub" | "raw";
  serverName: HiAnime.AnimeServers;
};

function getFirstServer(
  aniServer?: HiAnime.ScrapedEpisodeServers
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

export function VideoContainer({ currentEpisode }: { currentEpisode: string }) {
  const [availableServers, setAvailableServers] =
    useState<HiAnime.ScrapedEpisodeServers | null>(null);
  const [selectedServer, setSelectedServer] = useState<ServerInfoType | null>(
    null
  );
  const [serverResources, setServerResources] = useState<any | null>(null);

  const [isServerResourceError, setIsServerResourceError] = useState(false);

  useEffect(() => {
    const fetchServerDetails = async () => {
      try {
        const servers = await getEpsAvailableServers(currentEpisode);
        setAvailableServers(servers);
        const initialServer = getFirstServer(servers);
        setSelectedServer(initialServer);
        setIsServerResourceError(false);
      } catch (error) {
        console.error("Error fetching available servers:", error);
      }
    };

    fetchServerDetails();

    return () => {
      setSelectedServer(null);
      setServerResources(null);
    };
  }, [currentEpisode]);

  useEffect(() => {
    const fetchServerResources = async () => {
      if (!selectedServer) return;

      try {
        const resources: any = await getEpServerResources(
          currentEpisode,
          selectedServer.serverName,
          selectedServer.watchCategory
        );
        resources.sources = resources.sources
          .filter((source: any) => source.type === "hls")
          .map((source: any) => {
            const encodedUrl = btoa(source.url);
            return {
              ...source,
              url: `${proxy_url}/${encodedUrl}${file_extension}`,
            };
          });

        resources.tracks = resources.tracks.map((track: any) => {
          const encodedFile = btoa(track.file);
          return { ...track, file: `${proxy_url}/${encodedFile}` };
        });

        setServerResources(resources);
        setIsServerResourceError(false);
      } catch (error) {
        setIsServerResourceError(true);
        console.error("Error fetching server resources:", error);
      }
    };

    fetchServerResources();
  }, [selectedServer, currentEpisode]);

  const renderServerButtons = (
    servers: any[],
    category: "sub" | "dub" | "raw",
    icon?: React.ReactNode
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
                : "bg-gray-500 hover:bg-gray-600 transition-colors"
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
        ) : serverResources ? (
          <VidStackPlayer
            videoUrl={serverResources.sources[0].url}
            thumbnailUrl={
              serverResources.tracks.find(
                (track: any) => track.kind === "thumbnails"
              )?.file
            }
            subtitleUrls={serverResources.tracks.filter(
              (track: any) => track.kind === "captions"
            )}
          />
        ) : (
          <div className="w-full h-full animate-pulse bg-gray-700">
            <VidStackPlayerSkeleton />
          </div>
        )}
        </div>

        <div>
        {availableServers ? (
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
                        <BsBadgeCc className="size-4" />
                      )}

                    {availableServers.dub?.length > 0 &&
                      renderServerButtons(
                        availableServers.dub,
                        "dub",
                        <MdMicNone className="size-5" />
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
