"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import React from "react";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaTimeUpdateEventDetail,
  SeekButton,
  Track,
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
  DefaultAudioLayout,
} from "@vidstack/react/player/layouts/default";
import { SeekBackward10Icon, SeekForward10Icon } from "@vidstack/react/icons";
import { useRef, useState } from "react";

type IntroOutroType = {
  start: number;
  end: number;
};

export function VidStackPlayerSkeleton() {
  return (
    <MediaPlayer title="" src={""}>
      <MediaProvider />
    </MediaPlayer>
  );
}

const capitalizeFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

function SkipButton({
  onClick,
  isIntroSkipped,
  skippedCategory,
}: {
  onClick: (event: React.MouseEvent) => void;
  isIntroSkipped: boolean;
  skippedCategory: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        ${isIntroSkipped ? "block" : "hidden"}
        z-20 absolute right-[2%] bottom-[15%]
        text-black px-4 py-2 rounded-lg
        overflow-hidden
        bg-white/60 hover:bg-white
        transition-colors duration-300
        border-1 border-white
      `}
    >
      <span className="relative z-10 font-bold">
        Skip {capitalizeFirst(skippedCategory)}
      </span>
    </button>
  );
}

export function VidstackDefaultPlayer({
  videoUrl,
  subtitleUrls,
  title,
  introTiming,
  outroTiming,
  onVideoEnd,
  autoPlay,
  autoNext,
  autoSkip,
}: {
  videoUrl: string;
  subtitleUrls: Array<{
    file: string;
    label: string;
    kind: string;
    default?: boolean;
  }>;
  title: string;
  introTiming: IntroOutroType;
  outroTiming: IntroOutroType;
  onVideoEnd: () => void;
  autoPlay: boolean;
  autoNext: boolean;
  autoSkip: boolean;
}) {
  const player = useRef<MediaPlayerInstance>(null);
  const [isSkippedButtonVisible, setIsSkippedButtonVisible] = useState(false);
  const [skippedCategory, setSkippedCategory] = useState("");

  const [isVideoComingToEnd, setIsVideoComingToEnd] = useState(false);

  function handleTimeUpdate(detail: MediaTimeUpdateEventDetail) {
    const currentTime = detail.currentTime;

    if (currentTime >= introTiming.start && currentTime <= introTiming.end) {
      setIsSkippedButtonVisible(true);
      setSkippedCategory("intro");
      if (autoSkip) {
        if (player.current) {
          player.current.currentTime = introTiming.end + 1;
        }
      }
    } else if (
      currentTime >= outroTiming.start &&
      currentTime <= outroTiming.end
    ) {
      setIsSkippedButtonVisible(true);
      setSkippedCategory("outro");
      if (autoSkip) {
        if (player.current) {
          player.current.currentTime = outroTiming.end + 1;
        }
      }
    } else {
      setIsSkippedButtonVisible(false);
      setSkippedCategory("");
    }

    if (player.current) {
      const duration = player.current.duration;

      if (duration && currentTime >= duration - 10) {
        setIsVideoComingToEnd(true);
      } else {
        setIsVideoComingToEnd(false);
      }
    }
  }

  function handleSkippedButton(event: React.MouseEvent) {
    event.stopPropagation();

    if (skippedCategory === "intro") {
      if (player.current) {
        player.current.currentTime = introTiming.end + 1;
      }
    } else if (skippedCategory === "outro") {
      if (player.current) {
        player.current.currentTime = outroTiming.end + 1;
      }
    }
  }

  return (
    <MediaPlayer
      ref={player}
      title={title}
      autoPlay={autoPlay}
      className="player relative z-10 border-2 border-white-10 rounded-lg"
      src={videoUrl}
      viewType="video"
      crossOrigin
      playsInline
      aspectRatio="16/9"
      load="visible"
      posterLoad="visible"
      streamType="on-demand"
      storage="storage-key"
      onTimeUpdate={handleTimeUpdate}
      onEnded={autoNext ? onVideoEnd : () => {}}
    >
      <MediaProvider>
        {subtitleUrls.map((track: any, index: any) => (
          <Track
            key={index}
            src={track.file}
            kind={track.kind}
            label={track.label}
            default={track.default || false}
          />
        ))}
      </MediaProvider>
      <DefaultAudioLayout icons={defaultLayoutIcons} />
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        noGestures={false}
        download={true}
        slots={{
          afterCaptionButton: (
            <SeekButton seconds={-10} className="vds-button">
              <SeekBackward10Icon size={32} className="vds-icon" />
            </SeekButton>
          ),
          beforeSettingsMenu: (
            <SeekButton seconds={10} className="vds-button">
              <SeekForward10Icon size={32} className="vds-icon" />
            </SeekButton>
          ),
        }}
      />
      <SkipButton
        onClick={handleSkippedButton}
        isIntroSkipped={isSkippedButtonVisible}
        skippedCategory={skippedCategory}
      />
      <button
        onClick={onVideoEnd}
        className={`
        ${isVideoComingToEnd ? "block" : "hidden"}
        z-20 absolute right-[2%] bottom-[15%]
        text-black px-4 py-2 rounded-lg
        overflow-hidden
        bg-white/60 hover:bg-white
        transition-colors duration-300
        border-1 border-white
      `}
      >
        <span className="relative z-10 font-bold">Next Episode</span>
      </button>
    </MediaPlayer>
  );
}
