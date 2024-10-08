import { getAnimeAboutInfo } from "aniwatch";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";

function animeReleaseStatus(status: string) {
  if (status.toLowerCase().includes("currently")) {
    return "releasing";
  }
  if (status.toLowerCase().includes("finished")) {
    return "finished";
  }
  if (status.toLowerCase().includes("not yet")) {
    return "upcoming";
  }
  return "";
}

function AnimeInfo({ animeInfo }: { animeInfo: any }) {
  return (
    <div className="w-full flex">
      {/* left container */}
      <div className="w-1/12 flex justify-center items-center">
        # {animeInfo.topInfo.rank}
      </div>

      {/* right container */}
      <div className="w-full flex p-2 justify-between h-28 bg-[#0f0f11] rounded-2xl gap-6">
        {/* 1st half */}
        <div className="w-[60%] flex gap-2">
          <div className="h-full p-1">
            {/* image */}
            <div className="w-16 h-20">
              <img
                src={animeInfo.topInfo.poster}
                alt={animeInfo.topInfo.name}
                className="rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <h3>{animeInfo.topInfo.name}</h3>
            <div className="flex gap-2 flex-wrap overflow-hidden">
              {animeInfo.moreInfo.genres.map((genre: any, index: number) => (
                <p
                  key={index}
                  className="bg-pink-600 text-sm px-2 rounded-full"
                >
                  {genre}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/*2nd part   */}
        <div className="grow flex gap-6 justify-around px-10">
          <div className="flex flex-col grow items-start justify-center gap-2 w-1/2">
            <p>{animeInfo.stats.type}</p>
            <div className="flex flex-wrap overflow-hidden gap-2">
              {animeInfo.stats.episodes.sub && (
                <div className="flex justify-center items-center text-white bg-purple-500 px-2 rounded-full gap-1">
                  <div>
                    <BsBadgeCc />
                  </div>
                  <div>{animeInfo.stats.episodes?.sub}</div>
                </div>
              )}

              {animeInfo.stats.episodes.dub && (
                <div className="flex justify-center items-center text-white bg-blue-500 px-2 rounded-full gap-1">
                  <div>
                    <MdMicNone />
                  </div>
                  <div>{animeInfo.stats.episodes.dub}</div>
                </div>
              )}
            </div>
            {/* Tv */}
            {/* Sub Dub */}
          </div>
          <div className="flex flex-col grow items-start justify-center gap-2 w-1/2">
            <p>{animeInfo.moreInfo.premiered}</p>
            <p className="uppercase">
              {animeReleaseStatus(animeInfo.moreInfo.status)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function Top10Anime({
  top10AniDetails,
}: {
  top10AniDetails: any;
}) {
  const top10Category = Object.keys(top10AniDetails);

  const top10Details = await Promise.all(
    top10AniDetails.week.map(async (anime: any) => {
      const { info, moreInfo } = (await getAnimeAboutInfo(anime.id)).anime;
      return { stats: info.stats, moreInfo, topInfo: anime };
    })
  );

  //   const animeInfo = top10Details[0];

  //   console.log(animeInfo);
  return (
    <div className="w-full h-full p-3">
      <div className="w-full flex justify-between">
        <div className="inline-flex gap-2 items-stretch mb-4">
          <div className="flex-grow w-2 bg-purple-500 rounded-full"></div>
          <p className="text-2xl  font-bold">Top Anime</p>
        </div>

        <div className="flex gap-3 items-center">
          {top10Category.map((anime, index) => (
            <div className="capitalize bg-white-10 px-3 rounded-md" key={index}>
              {anime}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        {top10Details.map((animeInfo) => (
          <AnimeInfo animeInfo={animeInfo} />
        ))}
      </div>
    </div>
  );
}
