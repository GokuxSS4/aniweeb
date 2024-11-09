"use client";

import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

export function VidStackPlayer({
  videoUrl,
  subtitleUrls,
  thumbnailUrl,
}: {
  videoUrl: string;
  subtitleUrls: Array<{
    file: string;
    label: string;
    kind: string;
    default?: boolean;
  }>;
  thumbnailUrl: string;
}) {
  console.log("Video thumbnai", thumbnailUrl);
  return (
    <MediaPlayer
      title="Sprite Fight"
      className="border-2 border-white-10 rounded-lg"
      src={videoUrl}
    >
      <MediaProvider />
      {subtitleUrls.map((track: any, index: any) => (
        <Track
          key={index}
          src={track.file}
          kind={track.kind}
          label={track.label}
          default={track.default || false}
        />
      ))}

      <Track
        src={thumbnailUrl} 
        kind="metadata" 
        label="Thumbnails"
        default
      />

      <PlyrLayout icons={plyrLayoutIcons} />
    </MediaPlayer>
  );
}
