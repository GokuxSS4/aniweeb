"use client";

import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";

import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

import { SeekButton, type SeekButtonProps } from "@vidstack/react";


import { SeekBackwardIcon, SeekForwardIcon } from "@vidstack/react/icons";

export function VidStackPlayerSkeleton() {
  return (
    <MediaPlayer title="" src={""}>
      <MediaProvider />
    </MediaPlayer>
  );
}

function FastForwardBtn() {
  return (
    <SeekButton seconds={10}>
      <SeekForwardIcon />
    </SeekButton>
    // <></>
  );
}

function RewindBtn() {
  return (
    <SeekButton seconds={-10}>
      <SeekBackwardIcon />
    </SeekButton>
    // <></>
  );
}

export function VidstackPlyrPlayer({
  videoUrl,
  subtitleUrls,
  thumbnailUrl,
  captionUrl,
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
  captionUrl: string;
  title: string;
}) {
  console.log("Video videoUrl", videoUrl);
  console.log("thumbainuRL",thumbnailUrl);
  return (
    <MediaPlayer
      title={title}
      className="border-2 border-white-10 rounded-lg"
      src={videoUrl}
      crossOrigin={""}
      playsinline
      onTimeUpdate={() => {}}
      onLoadedMetadata={() => {}}
      onProviderChange={() => {}}
      aspectRatio="16/9"
      load="visible"
      posterLoad="visible"
      streamType="on-demand"
      storage="storage-key"
      keyTarget="player"
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

      <PlyrLayout
        icons={plyrLayoutIcons}
        thumbnails={thumbnailUrl}
        seekTime={10}
        slots={{
          beforePlayButton: null,
          rewindButton: '2' ,
          fastForwardButton: '1',
        }}
      />
    </MediaPlayer>
  );
}


// export function VidStackPlayer({
//   videoUrl,
//   subtitleUrls,
//   thumbnailUrl,
//   captionUrl,
//   title,
// }: {
//   videoUrl: string;
//   subtitleUrls: Array<{
//     file: string;
//     label: string;
//     kind: string;
//     default?: boolean;
//   }>;
//   thumbnailUrl: string;
//   captionUrl: string;
//   title: string;
// }) {
//   console.log("Video videoUrl", videoUrl);
//   console.log("thumbainuRL",thumbnailUrl);
//   return (
//     <MediaPlayer
//       title={title}
//       className="border-2 border-white-10 rounded-lg"
//       src={videoUrl}
//       crossOrigin={""}
//       playsinline
//       onTimeUpdate={() => {}}
//       onLoadedMetadata={() => {}}
//       onProviderChange={() => {}}
//       aspectRatio="16/9"
//       load="eager"
//       posterLoad="eager"
//       streamType="on-demand"
//       storage="storage-key"
//       keyTarget="player"
//     >
//       <MediaProvider>
//         {subtitleUrls.map((track: any, index: any) => (
//           <Track
//             key={index}
//             src={track.file}
//             kind={track.kind}
//             label={track.label}
//             default={track.default || false}
//           />
//         ))}

//         {/* <Track src={thumbnailUrl} kind="metadata" label="Thumbnails" default /> */}
//       </MediaProvider>

//       {/* <DefaultAudioLayout icons={defaultLayoutIcons}  seekStep={10} />
//       <DefaultVideoLayout icons={defaultLayoutIcons} seekStep={10} thumbnails={'https://s.megastatics.com/thumbnails/2134eca9df6e15ae375d299a7f67ba2c/thumbnails.vtt'}/>
//       */}
//       {/* <SeekButton seconds={-10}>
//         <SeekBackwardIcon />
//       </SeekButton>

//       <SeekButton seconds={10}>
//         <SeekForwardIcon />
//       </SeekButton> */}

//       {/* {subtitleUrls.map((track: any, index: any) => (
//         <Track
//           key={index}
//           src={track.file}
//           kind={track.kind}
//           label={track.label}
//           default={track.default || false}
//         />
//       ))} */}
//       {/* <Thumbnail.Root
//         src={thumbnailUrl}
//         time={10}
//         className="block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black data-[hidden]:hidden"
//       >
//         <Thumbnail.Img />
//       </Thumbnail.Root> */}
//       <PlyrLayout
//         icons={plyrLayoutIcons}
//         thumbnails={thumbnailUrl}
//         // seekTime={10}
//         // slots={{
//         //   beforePlayButton: null,
//         //   rewindButton: <RewindBtn/> ,
//         //   fastForwardButton: <FastForwardBtn />,
//         // }}
//       />
//     </MediaPlayer>
//   );
// }
