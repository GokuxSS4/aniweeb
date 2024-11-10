import { HiAnime } from "aniwatch";
import Link from "next/link";
import { BsBadgeCc } from "react-icons/bs";
import { FaRegPlayCircle } from "react-icons/fa";
import { MdMicNone } from "react-icons/md";

function formatText(text: string | string[]) {
  if (typeof text === "string") return text;

  return text
    .map((item) =>
      item
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .join(", ");
}

export function Overview({
  animeInfo,
}: {
  animeInfo: HiAnime.ScrapedAnimeAboutInfo["anime"];
}) {
  const infoFields = [
    { label: "Japanese", key: "japanese" },
    { label: "Synonyms", key: "synonyms" },
    { label: "Aired", key: "aired" },
    { label: "Premiered", key: "premiered" },
    { label: "Status", key: "status" },
    { label: "MAL Score", key: "malscore" },
    { label: "Studios", key: "studios" },
    { label: "Producers", key: "producers" },
    { label: "Genres", key: "genres" },
  ];
  return (
    <div className="flex flex-col gap-5 pt-6 lg:pt-24">
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
            <div
              className="flex gap-3 text-xs items-center
            "
            >
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

            {animeInfo.info.id && (
              <Link href={`/watch/${animeInfo.info.id}`}>
                <button className="bg-primary  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex justify-center items-center gap-2">
                  <FaRegPlayCircle />
                  Watch Now
                </button>
              </Link>
            )}
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
            {infoFields.map((field) => (
              <p key={field.key} className="flex gap-5 justify-between">
                <span className="font-semibold">{field.label}</span>
                <span className="text-sm">
                  {animeInfo.moreInfo[field.key] ? (
                    formatText(animeInfo.moreInfo[field.key])
                  ) : (
                    <span>&#63;</span>
                  )}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
