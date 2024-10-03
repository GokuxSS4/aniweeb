"use client";

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export function Trending({ aniList }: { aniList: any }) {
  let sliderRef = useRef(null);

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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-11/12 h-full mx-auto p-6 relative">
      <p className="text-2xl text-white mb-4">Trending Anime</p>
      <div className="relative slider-container">
        <div
          className="absolute right-0 top-0 bottom-0 z-10 flex flex-col h-11/12 w-4 p-2"
          style={{ right: "-10px" }}
        >
          <div className="h-full rounded-full flex flex-col  items-center justify-around gap-2 -mt-1">
            <button
              onClick={previous}
              className="grow bg-white-10 hover:bg-purple-500 rounded-lg p-2 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-200 focus:outline-none"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="grow bg-white-10  hover:bg-purple-500 rounded-lg p-2 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-200 focus:outline-none"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        </div>

        <Slider
          ref={(slider: null) => {
            sliderRef.current = slider;
          }}
          {...settings}
        >
          {aniList.map((anime: any) => (
            <div key={anime.id}>
              <div className="w-48 h-72 flex flex-col flex-shrink-0">
                <Image
                  src={anime.poster}
                  alt={anime.name}
                  width={185}
                  height={265}
                  priority={true}
                  className="rounded-md"
                />
                <p className="line-clamp-2 text-white mt-2 text-sm">
                  {anime.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
