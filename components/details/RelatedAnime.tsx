"use client";

import Link from "next/link";
import Carousel from "react-multi-carousel";

import { useEffect, useState } from "react";
import { HiAnime } from "aniwatch";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa6";

import { Header } from "@/components/common/Header";
import { LoadingSkeletons } from "@/components/home/Trending";

import "react-multi-carousel/lib/styles.css";

type RelatedAnimeType = HiAnime.ScrapedAnimeAboutInfo["relatedAnimes"][number];

export function RelatedAnimeCard({ anime }: { anime: RelatedAnimeType }) {
  return (
    <Link href={`/details?animeId=${anime.id}`}>
      <div className="w-[calc(16.66% - 1rem)] gap-2 p-2 flex flex-col flex-shrink-0 group">
        <div className="w-full aspect-[2/3] overflow-hidden relative">
          <img
            src={anime.poster || ""}
            alt={anime.name || "failed to retrive image"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 lg:group-hover:backdrop-blur-sm lg:transition lg:duration-300"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-300">
            <FaPlay className="text-white text-3xl lg:text-4xl" />
          </div>

          {anime.type && (
            <div className="absolute top-2 left-2 text-white text-[10px] sm:text-xs  bg-black bg-opacity-80 px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded s">
              {anime.type}
            </div>
          )}
          <div className="absolute flex  gap-1 bottom-2 right-1 text-xs">
            {anime.episodes.sub && (
              <div className="flex items-center text-white text-[10px] sm:text-xs bg-primary px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded gap-0.5">
                <BsBadgeCc className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>{anime.episodes.sub}</span>
              </div>
            )}
            {anime.episodes.dub && (
              <div className="flex items-center text-white text-[10px] sm:text-xs bg-secondary px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded gap-0.5">
                <MdMicNone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>{anime.episodes.dub}</span>
              </div>
            )}
          </div>
        </div>

        <p className="line-clamp-1 font-medium text-white text-base">
          {anime.name}
        </p>
      </div>
    </Link>
  );
}

export function RelatedAnime({
  relatedAnimes,
}: {
  relatedAnimes: HiAnime.ScrapedAnimeAboutInfo["relatedAnimes"];
}) {
  if (!relatedAnimes.length) {
    return <></>;
  }
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
      breakpoint: { max: 767, min: 300 },
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
      <Header title="Related" />
      <div className="relative w-full p-0">
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
              {relatedAnimes.map((anime: RelatedAnimeType) => (
                <RelatedAnimeCard anime={anime} key={anime.id} />
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
