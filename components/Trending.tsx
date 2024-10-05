"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export function Trending({ aniList }: { aniList: any }) {
  const sliderRef = useRef(null);

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

  const [isLoading,setIsloading] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(6);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
  
    if (width < 500) { // For mobile screens
      setSlidesToShow(1);
    } else if (width < 700) { // For tablets
      setSlidesToShow(2);
    } else if (width < 900) { // For larger tablets
      setSlidesToShow(3);
    } else if (width < 1100) { // For small desktops
      setSlidesToShow(4);
    } else if (width < 1356) { // For larger desktops
      setSlidesToShow(5);
    } else { // For very large screens
      setSlidesToShow(6);
    }
  };


  useEffect(() => {
    // Set initial slidesToShow based on the window size
    updateSlidesToShow();
    setIsloading(false)


    // Define the resize handler
    const handleResize = () => {
      updateSlidesToShow();
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow, // default for large screens
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    beforeChange: (current: any, next: any) => {
      setCurrentSlide(next);
    },
  };

  const numItems = aniList.length;
  const showPrevArrow = currentSlide > 0;
  const showNextArrow = currentSlide + settings.slidesToShow < numItems;

  return (
    <div className="w-11/12 h-full p-6 mx-auto">
      <p className="text-2xl text-purple-500 font-bold mb-4">Trending</p>
      {
        !isLoading && (
          <div className="slider-container flex">
          <div className="w-full">
            <Slider
              ref={(slider: any) => {
                sliderRef.current = slider;
              }}
              {...settings}
            >
              {aniList.map((anime: any) => (
                <div key={anime.id} className="transform transition-transform duration-500 hover:-translate-y-2 group">
                  <div className="w-48 gap-2 p-2 flex flex-col flex-shrink-0">
                    <Image
                      src={anime.poster}
                      alt={anime.name}
                      width={185}
                      height={265}
                      priority={true}
                      className="rounded-md"
                    />
                    <p className="line-clamp-2 text-white text-sm">
                      <span className="font-bold text-purple-400 mr-2">#{anime.rank}</span>{anime.name}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
  
          <div className="rounded-full flex flex-col-reverse items-center justify-around gap-2">
            <button
              onClick={previous}
              disabled={!showPrevArrow}
              className={`grow rounded-lg p-2 text-white flex items-center justify-center transition-all duration-200 focus:outline-none
                  ${
                    !showPrevArrow
                      ? "bg-gray-400 cursor-not-allowed opacity-50"
                      : "bg-white bg-opacity-10 hover:bg-purple-500 hover:bg-opacity-75"
                  }`}
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              disabled={!showNextArrow}
              className={`grow rounded-lg p-2 text-white flex items-center justify-center transition-all duration-200 focus:outline-none
                  ${
                    !showNextArrow
                      ? "bg-gray-400 cursor-not-allowed opacity-50"
                      : "bg-white bg-opacity-10 hover:bg-purple-500 hover:bg-opacity-75"
                  }`}
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        </div>
        )
      }
   
    </div>
  );
}
