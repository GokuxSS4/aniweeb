"use client";
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export function ExpandableAnimeDescription({
  animeDescription,
  maxHeight = 100,
}: {
  animeDescription: string;
  maxHeight: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeight = () => {
      const element = contentRef.current;
      if (!element) return;

      const actualHeight = element.scrollHeight;

      setShowButton(actualHeight > maxHeight);
    };

    checkHeight();

    const resizeObserver = new ResizeObserver(checkHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [maxHeight]);

  return (
    <div className="w-full relative">
      <div
        ref={contentRef}
        className={`${!isExpanded && showButton ? "overflow-hidden" : ""}`}
        style={{
          maxHeight: !isExpanded && showButton ? `${maxHeight}px` : "none",
        }}
      >
        <p className="mb-3">{animeDescription}</p>
      </div>

      {showButton && (
        <div className="w-full flex justify-end m-2">
          <button
            className="flex justify-center items-center gap-1 text-white brightness-75 hover:brightness-100"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-sm">
              {isExpanded ? "Show less" : "Show more"}
            </span>
            {isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
        </div>
      )}
    </div>
  );
}
