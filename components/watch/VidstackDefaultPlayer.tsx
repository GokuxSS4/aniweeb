"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  SeekButton,
  Track,
  Gesture,
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
  DefaultAudioLayout,
} from "@vidstack/react/player/layouts/default";
import { useRef, useState } from "react";
import { SeekBackward10Icon, SeekForward10Icon,PreviousIcon,NextIcon } from "@vidstack/react/icons";

export function VidstackDefaultPlayer({
  videoUrl,
  subtitleUrls,
  thumbnailUrl,
  title,
}: {
  videoUrl: string;
  subtitleUrls: Array<{
    file: string;
    label: string;
    kind: string;
    default?: boolean;
  }>;
  thumbnailUrl: string;
  title: string;
}) {
  console.log("video url", videoUrl);
  console.log("thumbnail url", thumbnailUrl);

  return (
    <MediaPlayer
      title={title}
      autoPlay
      className="player border-2 border-white-10 rounded-lg"
      src={videoUrl}
      viewType="video"
      crossOrigin
      playsInline
      aspectRatio="16/9"
      load="visible"
      posterLoad="visible"
      streamType="on-demand"
      storage="storage-key"
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
        slots={{
          afterPlayButton: (
            <SeekButton seconds={-10} className="vds-button">
              <SeekBackward10Icon className="vds-icon" />
            </SeekButton>
          ),
          beforeMuteButton: (
            <SeekButton seconds={10} className="vds-button">
              <SeekForward10Icon className="vds-icon" />
            </SeekButton>
          ),
        }}
      />
    </MediaPlayer>
  );
}
