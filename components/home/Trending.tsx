"use client";

import Link from "next/link";
import Carousel from "react-multi-carousel";
import Image from "next/image";

import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiAnime } from "aniwatch";
import { Header } from "@/components/common/Header";
import { FaPlay } from "react-icons/fa";

import "react-multi-carousel/lib/styles.css";

function TrendingAnimeCard({ anime }: { anime: HiAnime.TrendingAnime }) {
  return (
    <Link href={`details?animeId=${anime.id}`}>
      <div className="w-[calc(16.66% - 1rem)] gap-2 p-2 flex flex-col flex-shrink-0 group">
        <div className="w-full aspect-[2/3] overflow-hidden relative">
          <Image
            src={anime.poster || ""}
            alt={anime.name || ""}
            fill
            className="h-full w-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 lg:group-hover:backdrop-blur-sm lg:transition lg:duration-300"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-300">
            <FaPlay className="text-white text-3xl lg:text-4xl" />
          </div>

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
        <p className="line-clamp-1 font-medium text-white text-base">
          {anime.name}
        </p>
      </div>
    </Link>
  );
}

export function TrendingCardSkeleton() {
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

export function LoadingSkeletons() {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-4 w-full">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`
              flex-1 min-w-0
              ${index === 3 ? "hidden md:block" : ""}
              ${index === 4 ? "hidden xl:block" : ""}
              ${index === 5 ? "hidden xl:block" : ""}
              ${index === 6 ? "hidden 2xl:block" : ""}
              ${index === 7 ? "hidden 2xl:block" : ""}
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const CustomLeftArrow = ({ onClick }: any) => {
    return (
      <button
        onClick={onClick}
        className="absolute left-4 top-[45%]  bg-black/60 transform -translate-y-1/2 rounded-full p-2 text-white hidden md:flex items-center justify-center transition-all duration-200 hover:bg-black/70"
      >
        <FaChevronLeft size={24} />
      </button>
    );
  };
  const CustomRightArrow = ({ onClick }: any) => {
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-[45%] bg-black/60 transform -translate-y-1/2 rounded-full p-2 text-white hidden md:flex items-center justify-center transition-all duration-200 hover:bg-black/70"
      >
        <FaChevronRight size={24} />
      </button>
    );
  };

  const responsiveSettings = {
    largeDesktop: {
      breakpoint: { max: 3000, min: 1536 },
      items: 8,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1535, min: 1280 },
      items: 6,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1279, min: 768 },
      items: 4,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 450 },
      items: 3,
      slidesToSlide: 1,
    },
    smallmobile: {
      breakpoint: { max: 450, min: 250 },
      items: 2.5,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="w-full h-full">
      <Header title="Trending" />
      <div className="relative w-full">
        {isMounted ? (
          <>
            <Carousel
              swipeable={true}
              draggable={false}
              responsive={responsiveSettings}
              keyBoardControl={true}
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              customTransition="transform 500ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
            >
              {aniList.map((anime) => (
                <TrendingAnimeCard anime={anime} key={anime.id} />
              ))}
            </Carousel>
          </>
        ) : (
          <LoadingSkeletons />
        )}
      </div>
    </div>
  );
}
