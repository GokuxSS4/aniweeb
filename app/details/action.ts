"use server";

import { aniScraper } from "@/config/aniScraper";
import { redis } from "@/config/redis";

const ANIME_DETAILS = "details";

const MAX_AGE = 60_000 * 60 * 1;
const EXPIRY_MS = "PX";

export async function getAnimeDetails(animeId: string) {
  const key = `${ANIME_DETAILS}_${animeId}`;

  const cachedHomeData = await redis.get(key);

  if (cachedHomeData) {
    console.log("Redis cache data", cachedHomeData);
    return JSON.parse(cachedHomeData);
  }

  const animeDetails = await aniScraper.getInfo(animeId);

  await redis.set(key, JSON.stringify(animeDetails), EXPIRY_MS, MAX_AGE);

  return animeDetails;
}
