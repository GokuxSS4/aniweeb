"use server";

import { getEstimatedSchedule } from "aniwatch";
import redis from "@/config/redis";

const GET_SCHEDUEL_KEY = "scheduel";
const MAX_AGE = 60_000 * 60 * 2;
const EXPIRY_MS = `PX`; // milliseconds

export async function getEstimatedScheduleByDate(date: Date) {
  const formattedDate = date.toISOString().slice(0, 10);
  const key = GET_SCHEDUEL_KEY +" " + formattedDate;

  const cachedScheduleData = await redis.get(key);

  if (cachedScheduleData) {
    return JSON.parse(cachedScheduleData);
  }

  const estimatedData = await getEstimatedSchedule(formattedDate);

  await redis.set(key, JSON.stringify(estimatedData), EXPIRY_MS, MAX_AGE);
  return estimatedData;
}
