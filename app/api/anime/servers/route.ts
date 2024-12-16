import { NextRequest, NextResponse } from 'next/server';
import { aniScraper } from "@/config/aniScraper";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const animeEpisode = searchParams.get('animeEpisode');

  if (!animeEpisode) {
    return NextResponse.json({ error: 'Anime episode is required' }, { status: 400 });
  }

  try {
    const animeEpisodesServers = await aniScraper.getEpisodeServers(animeEpisode);
    console.log("Fresh Servers", animeEpisodesServers);

    return NextResponse.json(animeEpisodesServers);
  } catch (error) {
    console.error('Error fetching anime episode servers:', error);
    return NextResponse.json({ error: 'Failed to fetch anime episode servers' }, { status: 500 });
  }
}