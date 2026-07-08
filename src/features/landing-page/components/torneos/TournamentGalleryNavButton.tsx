import styles from "./TournamentGalleryNavButton.module.css";

type TournamentGalleryNavDirection = "prev" | "next";

interface TournamentGalleryNavButtonProps {
  direction: TournamentGalleryNavDirection;
  disabled: boolean;
  onClick: () => void;
}

const LABELS: Record<TournamentGalleryNavDirection, string> = {
  prev: "Desplazar miniaturas hacia la izquierda",
  next: "Desplazar miniaturas hacia la derecha",
};

const ChevronIcon = ({
  direction,
}: {
  direction: TournamentGalleryNavDirection;
}): JSX.Element => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {direction === "prev" ? (
      <path d="M15 18l-6-6 6-6" />
    ) : (
      <path d="M9 18l6-6-6-6" />
    )}
  </svg>
);

export const TournamentGalleryNavButton = ({
  direction,
  disabled,
  onClick,
}: TournamentGalleryNavButtonProps): JSX.Element => (
  <button
    type="button"
    className={styles.button}
    aria-label={LABELS[direction]}
    disabled={disabled}
    onClick={onClick}
  >
    <ChevronIcon direction={direction} />
  </button>
);
