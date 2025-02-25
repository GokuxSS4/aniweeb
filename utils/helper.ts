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
