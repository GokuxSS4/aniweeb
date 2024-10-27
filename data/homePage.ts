// import { getHomePage, getAnimeAboutInfo} from "aniwatch";
import { aniScraper } from "@/config/aniScraper";
import { redis } from "@/config/redis";

const HOME_DATA_KEY = "home";
const MAX_AGE = 60_000*60*3; // 1 hour
const EXPIRY_MS = `PX`; // milliseconds

async function getTop10AnimeData(top10AniDetails: any) {
  const initialData:any = {};

  for (const category in top10AniDetails) {
    const animePromises = top10AniDetails[category].map(async (anime: any) => {
      const { info, moreInfo } = (await aniScraper.getInfo(anime.id)).anime;
      return { stats: info.stats, moreInfo, topInfo: anime };
    });

    initialData[category] = await Promise.all(animePromises);
  }

  return initialData;
}

export async function getHomeData() {
  try {
    const cachedHomeData = await redis.get(HOME_DATA_KEY);

    if (cachedHomeData) {
      return JSON.parse(cachedHomeData);
    }

    const homePageDetails = await aniScraper.getHomePage();
    const top10AnimeData = await getTop10AnimeData(homePageDetails.top10Animes);
    const data = {
      homePageDetails,
      top10AnimeData,
      error: null,
    };
    await redis.set(HOME_DATA_KEY, JSON.stringify(data), EXPIRY_MS, MAX_AGE);
    return data;
  } catch (error) {
    return {
      homePageDetails: null,
      top10AnimeData: null,
      error,
    };
  }
}
