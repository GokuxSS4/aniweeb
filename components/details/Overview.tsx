import { HiAnime } from "aniwatch";
import { BsBadgeCc } from "react-icons/bs";
import { FaRegPlayCircle } from "react-icons/fa";
import { MdMicNone } from "react-icons/md";

export function Overview({
  animeInfo,
}: {
  animeInfo: HiAnime.ScrapedAnimeAboutInfo["anime"];
}) {
  return (
    <div className="pt-16 flex flex-col gap-5">
      <div className="flex  gap-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-[160px]">
            <img
              src={animeInfo.info.poster || ""}
              alt=""
              className="w-full h-full overflow-hidden object-cover"
            />
          </div>

          <div className="flex flex-col gap-6 justify-end">
            <h1 className="text-6xl font-bold">{animeInfo.info.name}</h1>
            <div className="flex gap-3 text-xs">
              <p className="px-1.5 py-0.5 rounded  bg-white-10">
                {animeInfo.info.stats.rating}
              </p>
              <p className="px-1.5 py-0.5 rounded  bg-yellow-600">
                {animeInfo.info.stats.quality}
              </p>
              {animeInfo.info.stats.episodes.sub && (
                <div className="flex items-center text-white  bg-primary px-1.5 py-0.5 rounded gap-0.5">
                  <BsBadgeCc className="w-3 h-3" />
                  <span>{animeInfo.info.stats.episodes.sub}</span>
                </div>
              )}
              {animeInfo.info.stats.episodes.dub && (
                <div className="flex items-center text-white  bg-secondary px-1.5 py-0.5 rounded gap-0.5">
                  <MdMicNone className="w-3 h-3" />
                  <span>{animeInfo.info.stats.episodes.dub}</span>
                </div>
              )}
              <span className="py-0.5">&#8226; </span>
              <p className="py-0.5">{animeInfo.info.stats.type}</p>
              <span className="py-0.5">&#8226; </span>
              <p className="py-0.5">{animeInfo.info.stats.duration}</p>
            </div>

            <div>
              <button className="bg-primary  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex justify-center items-center gap-2">
                <FaRegPlayCircle />
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-semibold">Overview</h3>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            {animeInfo.info.description &&
              animeInfo.info.description
                .split("\n\n")
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <p className="flex gap-5 justify-between">
              <span className="font-semibold">Japanese</span>
              <span>{animeInfo.moreInfo.japanese}</span>
            </p>
            <p className="flex gap-5 justify-between">
              <span className="font-semibold">Synonyms</span>
              <span>{animeInfo.moreInfo.synonyms}</span>
            </p>
            <p className="flex  gap-5 justify-between">
              <span className="font-semibold">Aired</span>
              <span>{animeInfo.moreInfo.aired}</span>
            </p>
            <p className="flex gap-5 justify-between">
              <span className="font-semibold">Premiered</span>
              <span>{animeInfo.moreInfo.premiered}</span>
            </p>
            <p className="flex gap-5 justify-between">
              <span className="font-semibold">Status</span>
              <span>{animeInfo.moreInfo.status}</span>
            </p>
            <p className="flex gap-5 justify-between">
              <span className="font-semibold">MAL Score</span>
              <span>{animeInfo.moreInfo.malscore}</span>
            </p>
            <p className="flex gap-5 justify-between">
              <span className="font-semibold">Studios</span>
              <span>{animeInfo.moreInfo.studios}</span>
            </p>
            <p className="flex  gap-5 justify-between">
              <span className="font-semibold">Producers</span>
              <span className="text-sm">
                {typeof animeInfo.moreInfo.producers == "string"
                  ? animeInfo.moreInfo.producers
                  : animeInfo.moreInfo.producers
                      .map((producer: string) =>
                        producer
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")
                      )
                      .join(", ")}
              </span>
            </p>
            <p className="flex gap-5 justify-between">
              <span className="font-semibold">Genres</span>
              <span className="text-sm">
                {typeof animeInfo.moreInfo.genres == "string"
                  ? animeInfo.moreInfo.genres
                  : animeInfo.moreInfo.genres
                      .map((producer: string) =>
                        producer
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")
                      )
                      .join(", ")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
