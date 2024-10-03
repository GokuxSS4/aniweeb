"use client";

import Image from "next/image";
import Slider from "react-slick";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { useRef } from "react";
import { FaRegPlayCircle } from "react-icons/fa";

export function SpotLight({ spotLightAnimes }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
    <div className="absolute inset-0 w-full h-[600px] overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {spotLightAnimes.map((anime) => (
          <div key={anime.rank} className="relative h-[600px]">
            <div className="relative w-full h-full">
              <Image
                src={anime.poster}
                alt={anime.name}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                }}
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            </div>

            <div className="absolute p-4 left-4 top-0 z-10 w-full h-full flex items-end">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  <h2 className="text-xl font-semibold text-purple-400 mb-4">
                    #{anime.rank} Spotlight
                  </h2>
                  <h1 className="text-4xl font-bold text-white mb-4 line-clamp-2">
                    {anime.name}
                  </h1>
                  <div className="flex space-x-4 mb-4">
                    {anime.type && (
                      <div className="text-white flex justify-center items-center gap-1">
                        <FaRegPlayCircle />
                        {anime.type}
                      </div>
                    )}
                    {anime.episodes.sub && (
                      <div className="flex justify-center items-center text-white bg-purple-500 px-2 rounded-full gap-1">
                        <div>
                          <BsBadgeCc />
                        </div>
                        <div>{anime.episodes.sub}</div>
                      </div>
                    )}
                    {anime.episodes.dub && (
                      <div className="flex justify-center items-center text-white bg-blue-500 px-2 rounded-full gap-1">
                        <div>
                          <MdMicNone />
                        </div>
                        <div>{anime.episodes.dub}</div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-base mb-6 line-clamp-3">
                    {anime.description}
                  </p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded-full flex justify-center items-center gap-2">
                    <FaRegPlayCircle />
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
