"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider, SeekButton, Track } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
  DefaultAudioLayout,
} from "@vidstack/react/player/layouts/default";
import { SeekBackward10Icon, SeekForward10Icon } from "@vidstack/react/icons";

export function VidStackPlayerSkeleton() {
  return (
    <MediaPlayer title="" src={""}>
      <MediaProvider />
    </MediaPlayer>
  );
}

export function VidstackDefaultPlayer({
  videoUrl,
  subtitleUrls,
  title,
}: {
  videoUrl: string;
  subtitleUrls: Array<{
    file: string;
    label: string;
    kind: string;
    default?: boolean;
  }>;
  title: string;
}) {
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
