"use server";

import { aniScraper } from "@/config/aniScraper";
// import { redis } from "@/config/redis";

const GET_SCHEDULE_KEY = "scheduel";
const HOME_DATA_KEY = "home";
const SEARCH_SUGGESTION_KEY  = "search_suggestion";

const MAX_AGE = 60_000 * 60 * 1;
const EXPIRY_MS = `PX`;

export async function getHomeData() {
  // const cachedHomeData = await redis.get(HOME_DATA_KEY);

  // if (cachedHomeData) {
  //   return JSON.parse(cachedHomeData);
  // }

  const homePageDetails = await aniScraper.getHomePage();
  // await redis.set(
  //   HOME_DATA_KEY,
  //   JSON.stringify(homePageDetails),
  //   EXPIRY_MS,
  //   MAX_AGE
  // );
  return homePageDetails;
}

export async function getEstimatedScheduleByDate(date: Date) {
  const formattedDate = date.toISOString().slice(0, 10);
  const key = GET_SCHEDULE_KEY + " " + formattedDate;

  // const cachedScheduleData = await redis.get(key);

  // if (cachedScheduleData) {
  //   return JSON.parse(cachedScheduleData);
  // }

  const estimatedData = await aniScraper.getEstimatedSchedule(formattedDate);

  // if (estimatedData.scheduledAnimes.length!=0){
  //   await redis.set(key, JSON.stringify(estimatedData), EXPIRY_MS, MAX_AGE);
  // }

  return estimatedData;
}

export async function getSearchSuggestion(animeName: string) {
  const SEARCH_MAX_AGE = 60_000 * 60 * 0.5;
  const key = SEARCH_SUGGESTION_KEY + " " + animeName;

  // const cachedScheduleData = await redis.get(SEARCH_SUGGESTION_KEY);

  // if (cachedScheduleData) {
  //   return JSON.parse(cachedScheduleData);
  // }

  const {suggestions} = await aniScraper.searchSuggestions(animeName);
  // if (suggestions.length != 0) {
  //   await redis.set(
  //     key,
  //     JSON.stringify(suggestions),
  //     EXPIRY_MS,
  //     SEARCH_MAX_AGE
  //   );
  // }

  return suggestions;
}
