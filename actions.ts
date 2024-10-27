"use server";

import { aniScraper } from "@/config/aniScraper";
import { redis } from "@/config/redis";

const GET_SCHEDUEL_KEY = "scheduel";
const HOME_DATA_KEY = "home";

const MAX_AGE = 60_000 * 60 * 2;
const EXPIRY_MS = `PX`;

export async function getHomeData() {
  const cachedHomeData = await redis.get(HOME_DATA_KEY);

  if (cachedHomeData) {
    return JSON.parse(cachedHomeData);
  }

  const homePageDetails = await aniScraper.getHomePage();
  await redis.set(
    HOME_DATA_KEY,
    JSON.stringify(homePageDetails),
    EXPIRY_MS,
    MAX_AGE
  );
  return homePageDetails;
}

export async function getEstimatedScheduleByDate(date: Date) {
  const formattedDate = date.toISOString().slice(0, 10);
  const key = GET_SCHEDUEL_KEY + " " + formattedDate;

  const cachedScheduleData = await redis.get(key);

  if (cachedScheduleData) {
    return JSON.parse(cachedScheduleData);
  }

  const estimatedData = await aniScraper.getEstimatedSchedule(formattedDate);

  await redis.set(key, JSON.stringify(estimatedData), EXPIRY_MS, MAX_AGE);
  return estimatedData;
}
