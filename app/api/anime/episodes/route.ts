import { NextRequest, NextResponse } from 'next/server';
import { aniScraper } from "@/config/aniScraper";
// import { redis } from "@/config/redis";

const ANIME_EPISODES_MAX_AGE = 60_000 * 60 * 0.5;
const EXPIRY_MS = `PX`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const animeName = searchParams.get('animeName');

  if (!animeName) {
    return NextResponse.json({ error: 'Anime name is required' }, { status: 400 });
  }

  const EPISODES_KEY = `episodes_${animeName}`;
  
  try {
    // const cachedHomeData = await redis.get(EPISODES_KEY);

    // if (cachedHomeData) {
    //   return NextResponse.json(JSON.parse(cachedHomeData));
    // }

    const animeEpisodes = await aniScraper.getEpisodes(animeName);

    // await redis.set(
    //   EPISODES_KEY,
    //   JSON.stringify(animeEpisodes),
    //   EXPIRY_MS,
    //   ANIME_EPISODES_MAX_AGE
    // );

    return NextResponse.json(animeEpisodes);
  } catch (error) {
    console.error('Error fetching anime episodes:', error);
    return NextResponse.json({ error: 'Failed to fetch anime episodes' }, { status: 500 });
  }
}