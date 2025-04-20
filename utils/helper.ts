import { HiAnime } from "aniwatch";

export function getUniqueAnimes(arr: any) {
  const seen = new Set();
  return arr.filter((item: any) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
}

export function setInRecentWatches(
  currentEpisode: string,
  animeID: string,
): void {
  let recentWatchAnimes: string[] = JSON.parse(
    localStorage.getItem("recentWatchAnimes") || "[]",
  );

  recentWatchAnimes = recentWatchAnimes.filter(
    (anime) => !anime.startsWith(animeID),
  );

  recentWatchAnimes.push(currentEpisode);

  if (recentWatchAnimes.length > 15) {
    recentWatchAnimes.shift();
  }

  localStorage.setItem("recentWatchAnimes", JSON.stringify(recentWatchAnimes));
}

export function getInRecentWatches(animeID: string): string | null {
  const recentWatchAnimes: string[] = JSON.parse(
    localStorage.getItem("recentWatchAnimes") || "[]",
  );

  return recentWatchAnimes.find((id) => id.startsWith(animeID)) || null;
}

export function transformServerData(data: HiAnime.ScrapedEpisodeServers) {
  const updateAndSort = (arr: any[]) => {
    return arr
      .map((server) => {
        if (server.serverName === "hd-2") {
          return { ...server, showServerName: "hd-1" };
        } else if (server.serverName === "hd-1") {
          return { ...server, showServerName: "hd-2" };
        }
        return server;
      })
      .sort((a, b) => {
        const order = { "hd-1": 0, "hd-2": 1 };
        return (
          order[a.showServerName as keyof typeof order] -
          order[b.showServerName as keyof typeof order]
        );
      });
  };

  return {
    ...data,
    sub: updateAndSort(data.sub),
    dub: updateAndSort(data.dub),
    raw: updateAndSort(data.raw),
  };
}
