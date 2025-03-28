"use server";

import { aniScraper } from "@/config/aniScraper";
import { redis } from "@/config/redis";
import { HiAnime } from "aniwatch";

const ANIME_EPISODE_DETAILS_AGE = 60_000 * 60 * 0.5;
const EXPIRY_MS = "PX";

export async function getAnimeEpisodes(animeName: string) {
  const EPISODES_KEY = `episodes_${animeName}`;
  const cachedHomeData = await redis.get(EPISODES_KEY);

  if (cachedHomeData) {
    return JSON.parse(cachedHomeData);
  }

  const animeEpisodes = await aniScraper.getEpisodes(animeName);

  await redis.set(
    EPISODES_KEY,
    JSON.stringify(animeEpisodes),
    EXPIRY_MS,
    ANIME_EPISODE_DETAILS_AGE,
  );

  return animeEpisodes;
}

export async function getEpsAvailableServers(animeEpisode: string) {
  const AVAILABLE_SERVER_KEY = `available_server_${animeEpisode}`;

  const cachedHomeData = await redis.get(AVAILABLE_SERVER_KEY);
  if (cachedHomeData) {
    return JSON.parse(cachedHomeData) as HiAnime.ScrapedEpisodeServers;
  }

  const animeEpisodesServers = await aniScraper.getEpisodeServers(animeEpisode);
  await redis.set(
    AVAILABLE_SERVER_KEY,
    JSON.stringify(animeEpisodesServers),
    EXPIRY_MS,
    ANIME_EPISODE_DETAILS_AGE,
  );

  return animeEpisodesServers;
}

export async function getEpServerResources(
  animeEpisode: string,
  serverName?: HiAnime.AnimeServers,
  category?: "sub" | "dub" | "raw",
) {
  const ANIME_EPISODES_RESOURCES_KEY = animeEpisode + serverName + category;
  const cachedHomeData = await redis.get(ANIME_EPISODES_RESOURCES_KEY);
  if (cachedHomeData) {
    return JSON.parse(cachedHomeData);
  }

  const animeEpisodesServers = await aniScraper.getEpisodeSources(
    animeEpisode,
    serverName,
    category,
  );
  await redis.set(
    animeEpisode,
    JSON.stringify(animeEpisodesServers),
    EXPIRY_MS,
    ANIME_EPISODE_DETAILS_AGE,
  );

  return animeEpisodesServers;
}
