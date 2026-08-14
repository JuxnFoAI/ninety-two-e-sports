import { useState } from "react";

import {
  useCaptionsPreferred,
  useEffectiveReducedMotion,
} from "@/features/accessibility";

import { TOURNAMENT_VIDEOS } from "../../data/tournaments";
import {
  getLatestTournamentVideo,
  getTournamentVideoKey,
} from "../../lib/tournamentGallery";
import { TORNEOS_CALENDAR_REVEAL_DELAY_MS } from "../../lib/torneosTitleTiming";
import { RevealItem, useRevealSection } from "../reveal";
import { TournamentBroadcast } from "./TournamentBroadcast";
import { TournamentSeasonCalendar } from "./TournamentSeasonCalendar";

const LATEST_VIDEO = getLatestTournamentVideo(TOURNAMENT_VIDEOS);

export const TournamentVideoGallery = (): JSX.Element | null => {
  const isSectionVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const captionsPreferred = useCaptionsPreferred();
  const [selectedKey, setSelectedKey] = useState(() =>
    LATEST_VIDEO ? getTournamentVideoKey(LATEST_VIDEO) : "",
  );
  const [isPlaying, setIsPlaying] = useState(false);

  if (TOURNAMENT_VIDEOS.length === 0) {
    return null;
  }

  const selectedVideo =
    TOURNAMENT_VIDEOS.find(
      (video) => getTournamentVideoKey(video) === selectedKey,
    ) ??
    LATEST_VIDEO ??
    TOURNAMENT_VIDEOS[0];
  const showCalendar = TOURNAMENT_VIDEOS.length > 1;

  const handleSelect = (videoKey: string): void => {
    setSelectedKey(videoKey);
    setIsPlaying(false);
  };

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
            videos={TOURNAMENT_VIDEOS}
            selectedKey={getTournamentVideoKey(selectedVideo)}
            onSelect={handleSelect}
          />
        </RevealItem>
      ) : null}
    </>
  );
};
