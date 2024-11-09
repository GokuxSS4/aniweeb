"use client";

import {
  getEpsAvailableServers,
  getEpServerResources,
} from "@/app/watch/actions";
import { HiAnime } from "aniwatch";
import { useEffect, useState } from "react";
import { VidStackPlayer } from "./VidStackPlayer";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";

type ServerInfoType = {
  watchCategory: "sub" | "dub" | "raw";
  serverName: HiAnime.AnimeServers;
};

function getFirstServer(
  aniServer?: HiAnime.ScrapedEpisodeServers
): ServerInfoType | null {
  console.log("Intial server", aniServer);
  if (aniServer?.sub?.length) {
    return {
      watchCategory: "sub",
      serverName: aniServer.sub[0].serverName as HiAnime.AnimeServers,
    };
  }
  if (aniServer?.dub?.length) {
    return {
      watchCategory: "dub",
      serverName: aniServer.dub[0].serverName as HiAnime.AnimeServers,
    };
  }
  if (aniServer?.raw?.length) {
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

  useEffect(() => {
    const fetchServerDetails = async () => {
      try {
        const servers = await getEpsAvailableServers(currentEpisode);
        setAvailableServers(servers);

        const initialServer = getFirstServer(servers);
        setSelectedServer(initialServer);
      } catch (error) {
        console.error("Error fetching available servers:", error);
      }
    };

    fetchServerDetails();

    () => {
      setSelectedServer(null);
      setServerResources(null);
    };
  }, [currentEpisode]);

  useEffect(() => {
    const fetchServerResources = async () => {
      if (!selectedServer) return;

      try {
        const resources = await getEpServerResources(
          currentEpisode,
          selectedServer.serverName,
          selectedServer.watchCategory
        );
        console.log("server resources", resources);
        setServerResources(resources);
      } catch (error) {
        console.error("Error fetching server resources:", error);
      }
    };

    fetchServerResources();
  }, [selectedServer, currentEpisode]);

  if (!serverResources) {
    return <div>Loading video resources...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <VidStackPlayer
        videoUrl={serverResources.sources[0].url}
        thumbnailUrl={
          serverResources.tracks.filter(
            (track: any) => track.kind === "thumbnails"
          )[0].file
        }
        subtitleUrls={serverResources.tracks.filter(
          (track: any) => track.kind === "captions"
        )}
      />
      <div className="bg-[rgb(15,14,15)] flex rounded-md">
        <div className="hidden lg:flex flex-col gap-1 rounded-md bg-secondary justify-center items-center w-[20%] p-4">
          <p className="text-sm">You are watching</p>
          <p className="text-lg	 font-bold">
            Episode {availableServers?.episodeNo}
          </p>
          <p className="text-sm">
            If current server doesn't work please try other servers beside.
          </p>
        </div>
        <div className="flex flex-wrap flex-col items-center justify-center">
          {availableServers !== null && (
            <>
              {availableServers.sub.length > 0 && (
                <div className="w-full flex gap-5 px-4 py-2  justify-start items-center">
                  <div className="px-2 py-1 text-sm flex gap-2 items-center justify-center">
                    <BsBadgeCc className="size-3" />
                    <span>SUB</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableServers.sub.map((server) => (
                      <button
                        key={server.serverName}
                        className={`px-4 py-1 text-sm uppercase rounded-md ${
                          selectedServer?.watchCategory == "sub" &&
                          selectedServer.serverName == server.serverName
                            ? "bg-primary"
                            : "bg-gray-500"
                        }`}
                        onClick={() =>
                          setSelectedServer({
                            watchCategory: "sub",
                            serverName:
                              server.serverName as HiAnime.AnimeServers,
                          })
                        }
                      >
                        {server.serverName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {availableServers.dub.length > 0 && (
                <div className="w-full flex gap-5 px-4 py-2  justify-start items-center">
                  <div className="px-2 py-1 text-sm flex gap-2 items-center justify-center">
                    <MdMicNone />
                    <span>DUB</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {availableServers.dub.map((server) => (
                      <button
                        key={server.serverName}
                        className={`px-4 py-1 text-sm uppercase rounded-md ${
                          selectedServer?.watchCategory == "dub" &&
                          selectedServer.serverName == server.serverName
                            ? "bg-primary"
                            : "bg-gray-500"
                        }`}
                        onClick={() =>
                          setSelectedServer({
                            watchCategory: "dub",
                            serverName:
                              server.serverName as HiAnime.AnimeServers,
                          })
                        }
                      >
                        {server.serverName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {availableServers.raw.length > 0 && (
                <div className="w-full flex gap-5 px-4 py-2 justify-start items-center">
                  <div className="px-2 py-1 text-sm flex gap-2 items-center justify-center">
                    <span>RAW</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableServers.raw.map((server) => (
                      <button
                        key={server.serverName}
                        className={`px-4 py-1 text-sm uppercase rounded-md ${
                          selectedServer?.watchCategory == "raw" &&
                          selectedServer.serverName == server.serverName
                            ? "bg-primary"
                            : "bg-gray-500"
                        }`}
                        onClick={() =>
                          setSelectedServer({
                            watchCategory: "raw",
                            serverName:
                              server.serverName as HiAnime.AnimeServers,
                          })
                        }
                      >
                        {server.serverName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
