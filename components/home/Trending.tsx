"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiAnime } from "aniwatch";

import { Header } from "@/components/common/Header";

function TrendingAnimeCard({ anime }: { anime: HiAnime.TrendingAnime }) {
  return (
    <div className="w-[calc(16.66% - 1rem)] gap-2 p-2 flex flex-col flex-shrink-0">
      <div className="w-full aspect-[2/3] overflow-hidden relative">
        <img
          src={anime.poster || ""}
          alt={anime.name || "failed to retrive image"}
          className="rounded-md h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-0 left-0">
          <div className="relative flex items-center justify-center size-8 lg:size-10">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

            <div className="absolute inset-0 border-2 border-white/30" />

            <span className="relative text-white text-sm md:text-base lg:text-lg font-bold">
              #{anime.rank}
            </span>
          </div>
        </div>
      </div>

      <p className="line-clamp-1 font-medium text-white text-base">{anime.name}</p>
    </div>
  );
}

function TrendingCardSkeleton() {
  return (
    <div className="px-2 w-full">
      <div className="transform transition-transform duration-500 hover:cursor-pointer">
        <div className="w-full aspect-[2/3] overflow-hidden relative">
          <div className="h-full w-full rounded-md bg-[#141414] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function LoadingSkeletons() {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-4 w-full">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`
              flex-1 min-w-0
              ${index == 3 ? "hidden md:block" : ""}
              ${index == 4 ? "hidden xl:block" : ""}
              ${index == 5 ? "hidden xl:block" : ""}
              ${index == 6 ? "hidden 2xl:block" : ""}
              ${index == 7 ? "hidden 2xl:block" : ""}
            `}
          >
            <TrendingCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

interface TrendingProps {
  aniList: HiAnime.TrendingAnime[];
}

export function Trending({ aniList }: TrendingProps) {
  const sliderRef = useRef<Slider>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    swipeToSlide: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Header title="Trending" />
      <div className="relative w-full px-0 md:px-8">
        {isMounted ? (
          <>
            <Slider ref={sliderRef} {...settings} className="!static">
              {isMounted
                ? aniList.map((anime) => (
                    <TrendingAnimeCard anime={anime} key={anime.id} />
                  ))
                : Array.from({ length: aniList.length }).map((_, index) => (
                    <TrendingCardSkeleton key={index} />
                  ))}
            </Slider>

            <button
              onClick={previous}
              className="absolute left-0 top-[45%] bg-opacity-75 transform -translate-y-1/2 rounded-full p-3 text-white  hidden md:flex items-center justify-center transition-all duration-200 hover:bg-white/10"
            >
              <FaChevronLeft size={24} />
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-[45%] bg-opacity-75 transform -translate-y-1/2 rounded-full p-3 text-white  hidden md:flex items-center justify-center transition-all duration-200 hover:bg-white/10"
            >
              <FaChevronRight size={24} />
            </button>
          </>
        ) : (
          <LoadingSkeletons />
        )}
      </div>
    </div>
  );
}
