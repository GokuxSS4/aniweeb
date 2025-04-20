import { NextRequest, NextResponse } from "next/server";
import { aniScraper } from "@/config/aniScraper";
import { transformServerData } from "@/utils/helper";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const animeEpisode = searchParams.get("animeEpisode");

  if (!animeEpisode) {
    return NextResponse.json(
      { error: "Anime episode is required" },
      { status: 400 },
    );
  }

  try {
    const animeEpisodesServers =
      await aniScraper.getEpisodeServers(animeEpisode);

    return NextResponse.json(transformServerData(animeEpisodesServers));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch anime episode servers" },
      { status: 500 },
    );
  }
}
