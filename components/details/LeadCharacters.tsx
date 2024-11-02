import { HiAnime } from "aniwatch";
import { Header } from "@/components/common/Header";

type LeadCharactersType =
  HiAnime.ScrapedAnimeAboutInfo["anime"]["info"]["charactersVoiceActors"][number];

function LeadCharacterItem({
  characterInfo,
}: {
  characterInfo: LeadCharactersType;
}) {
  return (
    <div className="w-full h-24 bg-[#0f0f11] rounded-md flex justify-between items-center px-4">
      <div className="flex flex-1 justify-start gap-4 items-center">
        <div className="size-[45px]">
          <img
            src={characterInfo.character.poster}
            alt=""
            className="w-full h-full rounded-full object-cover"
            loading="lazy"
          />
        </div>

        <p>{characterInfo.character.name}</p>
      </div>
      <div className="flex flex-1 justify-end gap-4 items-center">
        <p>{characterInfo.voiceActor.name}</p>
        <div className="size-[45px]">
          <img
            src={characterInfo.voiceActor.poster}
            alt=""
            className="w-full h-full rounded-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export function LeadCharacters({
  leadCharacters,
}: {
  leadCharacters: LeadCharactersType[];
}) {
  if (!leadCharacters.length) {
    return <></>;
  }

  console.log("leadCharacters", leadCharacters);
  return (
    <div className="w-full h-full">
      <Header title={"Lead Characters & Voice Actors"} />
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadCharacters.map((anime: LeadCharactersType, index: number) => (
          <LeadCharacterItem characterInfo={anime} key={index} />
        ))}
      </div>
    </div>
  );
}
