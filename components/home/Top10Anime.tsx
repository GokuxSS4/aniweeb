"use client";

import { useEffect, useState } from "react";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";

function animeReleaseDetails(status: string) {
  if (status.toLowerCase().includes("currently")) {
    return {message:"releasing",tailwindClass:'text-green-300'} ;
  }
  if (status.toLowerCase().includes("finished")) {
    return {message:"finished",tailwindClass:'text-gray-300'};
  }
  if (status.toLowerCase().includes("not yet")) {
    return {message:"upcoming",tailwindClass:'text-yellow-300'};
  }
  return {message:"",tailwindClass:''};
}


const aniColors = [
  { bgColor: 'bg-red-700', textColor: 'text-red-700' },
  { bgColor: 'bg-yellow-700', textColor: 'text-yellow-700' },
  { bgColor: 'bg-green-700', textColor: 'text-green-700' },
  { bgColor: 'bg-blue-700', textColor: 'text-gray-400' },
  { bgColor: 'bg-orange-700', textColor: 'text-gray-400' },
  { bgColor: 'bg-teal-700', textColor: 'text-gray-400' },
  { bgColor: 'bg-pink-700', textColor: 'text-gray-400' },
  { bgColor: 'bg-emerald-700', textColor: 'text-gray-400' },
  { bgColor: 'bg-amber-700', textColor: 'text-gray-400' },
  { bgColor: 'bg-lime-700', textColor: 'text-gray-400' }
];


function AnimeInfo({ animeInfo,rank}: { animeInfo: any,rank:number}) {
  const animeReleaseData = animeReleaseDetails(animeInfo.moreInfo.status);
  return (
    <div className="w-full flex">
      {/* left container */}
      <div className={`w-1/12 flex justify-center items-center ${aniColors[rank].textColor}`}>
        # {animeInfo.topInfo.rank}
      </div>

      {/* right container */}
      <div className="w-full flex p-2 justify-between h-23 bg-[#0f0f11] rounded-2xl gap-6">
        {/* 1st half */}
        <div className="w-[60%] flex gap-2 ">
          <div className="h-full p-1 flex justify-center">
            {/* image */}
            <div className="w-16 h-20 overflow-hidden rounded-md">
              <img
                src={animeInfo.topInfo.poster}
                alt={animeInfo.topInfo.name}
               
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <h3>{animeInfo.topInfo.name}</h3>
            <div className="flex gap-2 flex-wrap overflow-hidden">
              {animeInfo.moreInfo.genres.map((genre: any, index: number) => (
                <p
                  key={index}
                  className={`text-sm px-2 rounded-full ${aniColors[rank].bgColor}`}
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
            <p className={`uppercase ${animeReleaseData.tailwindClass}`}>
              {animeReleaseData.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Top10Anime({ top10Details }: { top10Details: any }) {
  const top10Category = Object.keys(top10Details);
  const [selectedCategory, setSelectedCategory] = useState(top10Category[0]);
  const [topAnimes,setTopAnimes] = useState(top10Details[selectedCategory]);

  useEffect(()=>{
    setTopAnimes(top10Details[selectedCategory]);
  },[selectedCategory])


  return (
    <div className="w-full h-full p-3">
      <div className="w-full flex justify-between">
        <div className="inline-flex gap-2 items-stretch mb-4">
          <div className="flex-grow w-2 bg-purple-500 rounded-full"></div>
          <p className="text-2xl  font-bold">Top Anime</p>
        </div>

        <div className="flex gap-3 items-center">
          {top10Category.map((anime, index) => {
            return (
              <button
                className={`capitalize px-3 rounded-md ${selectedCategory==anime ? 'bg-purple-500' : 'bg-white-10'}`}
                value={anime}
                onClick={(e)=>setSelectedCategory(e.target?.value)}
                key={index}
              >
                {anime}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        {
        topAnimes.map((animeInfo:any,index:number) => (
          <AnimeInfo animeInfo={animeInfo} rank={index}/>
        ))}
      </div>
    </div>
  );
}


