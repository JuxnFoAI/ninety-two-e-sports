import { useState } from "react";

import {
  useCaptionsPreferred,
  useEffectiveReducedMotion,
} from "@/features/accessibility";

import { TOURNAMENT_CHAMPIONSHIPS } from "../../data/tournaments";
import {
  getLatestTournamentVideo,
  getTournamentVideoKey,
} from "../../lib/tournamentGallery";
import { TORNEOS_CALENDAR_REVEAL_DELAY_MS } from "../../lib/torneosTitleTiming";
import { RevealItem, useRevealSection } from "../reveal";
import { TournamentBroadcast } from "./TournamentBroadcast";
import { TournamentSeasonCalendar } from "./TournamentSeasonCalendar";

const CURRENT_CHAMPIONSHIP = TOURNAMENT_CHAMPIONSHIPS[0];

export const TournamentVideoGallery = (): JSX.Element | null => {
  const isSectionVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const captionsPreferred = useCaptionsPreferred();
  const [selectedChampionshipId, setSelectedChampionshipId] = useState(
    () => CURRENT_CHAMPIONSHIP?.id ?? "",
  );
  const selectedChampionship =
    TOURNAMENT_CHAMPIONSHIPS.find(
      (championship) => championship.id === selectedChampionshipId,
    ) ?? CURRENT_CHAMPIONSHIP;
  const videos = selectedChampionship?.videos ?? [];
  const latestVideo = getLatestTournamentVideo(videos);
  const [selectedKey, setSelectedKey] = useState(() =>
    latestVideo ? getTournamentVideoKey(latestVideo) : "",
  );
  const [isPlaying, setIsPlaying] = useState(false);

  if (TOURNAMENT_CHAMPIONSHIPS.length === 0 || !selectedChampionship) {
    return null;
  }

  const selectedVideo =
    videos.find((video) => getTournamentVideoKey(video) === selectedKey) ??
    latestVideo ??
    videos[0];
  const showCalendar = TOURNAMENT_CHAMPIONSHIPS.length > 1 || videos.length > 1;

  const handleSelect = (videoKey: string): void => {
    setSelectedKey(videoKey);
    setIsPlaying(false);
  };

  const handleSelectChampionship = (championshipId: string): void => {
    if (championshipId === selectedChampionshipId) {
      return;
    }

    const nextChampionship =
      TOURNAMENT_CHAMPIONSHIPS.find(
        (championship) => championship.id === championshipId,
      ) ?? CURRENT_CHAMPIONSHIP;
    const nextLatest = nextChampionship
      ? getLatestTournamentVideo(nextChampionship.videos)
      : undefined;

    setSelectedChampionshipId(championshipId);
    setSelectedKey(nextLatest ? getTournamentVideoKey(nextLatest) : "");
    setIsPlaying(false);
  };

  if (!selectedVideo) {
    return null;
  }

  return (
    <>
      <TournamentBroadcast
        video={selectedVideo}
        isPlaying={isPlaying}
        isSectionVisible={isSectionVisible}
        captionsPreferred={captionsPreferred}
        onPlay={() => setIsPlaying(true)}
      />

      {showCalendar ? (
        <RevealItem
          delayMs={prefersReducedMotion ? 0 : TORNEOS_CALENDAR_REVEAL_DELAY_MS}
        >
          <TournamentSeasonCalendar
            championships={TOURNAMENT_CHAMPIONSHIPS}
            selectedChampionshipId={selectedChampionship.id}
            onSelectChampionship={handleSelectChampionship}
            videos={videos}
            selectedKey={getTournamentVideoKey(selectedVideo)}
            onSelect={handleSelect}
          />
        </RevealItem>
      ) : null}
    </>
  );
};
