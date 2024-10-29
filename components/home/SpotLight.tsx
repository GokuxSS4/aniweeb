"use client";

import Image from "next/image";
import Slider from "react-slick";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { useRef } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiAnime } from "aniwatch";

function SpoitLightAnimeInfo({ anime }: { anime: HiAnime.SpotlightAnime }) {
  return (
    <div className="absolute left-4 top-0 z-20 w-[90%] mx-auto h-full flex items-end">
      <div className="max-w-xl">
        <h2 className="text-xl font-semibold text-primary mb-4">
          #{anime.rank} Spotlight
        </h2>
        <h1 className="text-4xl font-bold text-white mb-4 line-clamp-2">
          {anime.name}
        </h1>
        <div className="hidden lg:flex space-x-4 mb-4">
          {anime.type && (
            <div className="text-white flex justify-center items-center gap-1">
              <FaRegPlayCircle />
              {anime.type}
            </div>
          )}
          {anime.episodes.sub && (
            <div className="flex justify-center items-center text-white bg-primary px-2 rounded-full gap-1">
              <div>
                <BsBadgeCc />
              </div>
              <div>{anime.episodes.sub}</div>
            </div>
          )}
          {anime.episodes.dub && (
            <div className="flex justify-center items-center text-white bg-secondary px-2 rounded-full gap-1">
              <div>
                <MdMicNone />
              </div>
              <div>{anime.episodes.dub}</div>
            </div>
          )}
        </div>
        <div className="hidden lg:block">
          <p className="text-gray-300 text-base mb-6 line-clamp-3">
            {anime.description}
          </p>
        </div>
        <button className="bg-primary hover:bg-purple-700 text-black font-bold py-2 px-4 rounded-full flex justify-center items-center gap-2">
          <FaRegPlayCircle />
          Watch Now
        </button>
      </div>
    </div>
  );
}

export function SpotLight({
  spotLightAnimes,
}: {
  spotLightAnimes: HiAnime.SpotlightAnime[];
}) {
  const sliderRef = useRef<Slider>(null);

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

  const next = () => {
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="relative w-full z-[-1]">
      <div className="w-full  h-[450px] lg:h-[600px] overflow-hidden ">
        <Slider ref={sliderRef} {...settings}>
          {spotLightAnimes.map((anime: HiAnime.SpotlightAnime) => (
            <div key={anime.rank} className="relative w-full">
              <div className="relative w-full h-[450px] lg:h-[600px] brightness-50">
                <Image
                  src={anime.poster || ""}
                  alt={anime.name || "can't retrive image"}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                  quality={100}
                  priority
                />
                <div
                  className="absolute z-10  inset-0"
                  style={{
                    background: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%),linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%)`,
                  }}
                />
              </div>

              <div className="relative w-[90%] mx-auto">
                <SpoitLightAnimeInfo anime={anime} />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="hidden lg:flex absolute  right-[5%] bottom-4 rounded-full justify-end gap-4 p-3">
        <button
          onClick={previous}
          className=" bg-white-10 hover:bg-purple-500 rounded-lg p-2 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-200"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className=" bg-white-10  hover:bg-purple-500 rounded-lg p-2 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-200"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
