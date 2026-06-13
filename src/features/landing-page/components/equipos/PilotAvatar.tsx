import { useState } from "react";
import {
  getPilotPhotoObjectClass,
  getPilotPhotoStyles,
} from "../../lib/pilotPhotoFit";
import type { Pilot } from "../../types/pilot";

interface PilotAvatarProps {
  pilot: Pilot;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export const PilotAvatar = ({ pilot }: PilotAvatarProps): JSX.Element => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(pilot.photo) && !imageFailed;

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-[#1a1a1a]">
      {showImage ? (
        <img
          src={pilot.photo}
          alt=""
          className={`h-full w-full object-cover transition-transform duration-500 ${getPilotPhotoObjectClass(pilot.photoFit)}`}
          style={getPilotPhotoStyles(pilot.photoFit)}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center font-[var(--font-orbitron)] text-[1rem] font-semibold uppercase tracking-[0.16em] text-[#2e2e2e]"
          aria-hidden
        >
          {getInitials(pilot.alias)}
        </span>
      )}
    </div>
  );
};
