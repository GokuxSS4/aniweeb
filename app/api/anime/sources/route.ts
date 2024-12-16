import { NextRequest, NextResponse } from 'next/server';
import { aniScraper } from "@/config/aniScraper";
import { redis } from "@/config/redis";
import { HiAnime } from "aniwatch";

const ANIME_EPISODES_MAX_AGE = 60_000 * 60 * 0.5;
const EXPIRY_MS = `PX`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const animeEpisode = searchParams.get('animeEpisode');
  const serverName = searchParams.get('serverName') as HiAnime.AnimeServers;
  const category = searchParams.get('category') as "sub" | "dub" | "raw";

  if (!animeEpisode) {
    return NextResponse.json({ error: 'Anime episode is required' }, { status: 400 });
  }

  const ANIME_EPISODES_RESOURCES_KEY = animeEpisode + serverName + category;

  try {
    const cachedHomeData = await redis.get(ANIME_EPISODES_RESOURCES_KEY);
    if (cachedHomeData) {
      return NextResponse.json(JSON.parse(cachedHomeData));
    }

    const animeEpisodesServers = await aniScraper.getEpisodeSources(
      animeEpisode,
      serverName,
      category
    );

    await redis.set(
      animeEpisode,
      JSON.stringify(animeEpisodesServers),
      EXPIRY_MS,
      ANIME_EPISODES_MAX_AGE
    );

    return NextResponse.json(animeEpisodesServers);
  } catch (error) {
    console.error('Error fetching anime episode sources:', error);
    return NextResponse.json({ error: 'Failed to fetch anime episode sources' }, { status: 500 });
  }
}