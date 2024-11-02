import { HiAnime } from "aniwatch";
import { Header } from "@/components/common/Header";

type AnimeSeasonType = HiAnime.ScrapedAnimeAboutInfo["seasons"][number];

function SeasonItem({ anime }: { anime: AnimeSeasonType }) {
  return (
    <div
      className={`w-full h-[136px] relative overflow-hidden rounded-md ${
        anime.isCurrent ? "border-2 border-purple-500" : ""
      }`}
    >
      <img
        src={anime.poster || ""}
        alt={anime.name || ""}
        className="h-full w-full object-cover brightness-50"
        loading="lazy"
      />

      <div className="h-full absolute top-[5%] left-[5%] w-[90%] mx-auto flex flex-col justify-center items-start">
        <h2 className="text-2xl font-bold line-clamp-2">{anime.title}</h2>
        <p className="text-sm text-white/90 line-clamp-1">{anime.name}</p>
      </div>
    </div>
  );
}

export function Seasons({
  animeSeasons,
}: {
  animeSeasons: HiAnime.ScrapedAnimeAboutInfo["seasons"];
}) {
  if (!animeSeasons.length) {
    return <></>;
  }

  return (
    <div className="w-full h-full">
      <Header title="Seasons" />
      <div className="grid grid-col-1 md:grid-col-4 lg:grid-cols-6 xl:grid-col-8 gap-5">
        {animeSeasons.map((anime: AnimeSeasonType) => (
          <SeasonItem anime={anime} key={anime.id} />
        ))}
      </div>
    </div>
  );
}
