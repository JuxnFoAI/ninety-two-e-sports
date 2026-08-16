import type { NewsSpiralPhoto } from "../../lib/newsSpiral";
import styles from "./NewsPhotoFallback.module.css";

type NewsPhotoFallbackProps = {
  photos: readonly NewsSpiralPhoto[];
  onSelect: (id: string) => void;
};

/** Static photo grid when 3D motion is disabled. */
export const NewsPhotoFallback = ({
  photos,
  onSelect,
}: NewsPhotoFallbackProps): JSX.Element => (
  <ul className={styles.list} aria-label="Fotos de noticias">
    {photos.map((photo) => (
      <li key={photo.id}>
        <button
          type="button"
          className={styles.select}
          onClick={() => onSelect(photo.id)}
          aria-label={`Abrir noticia: ${photo.imageAlt}`}
        >
          <figure className={styles.frame}>
            <img
              src={photo.image}
              alt=""
              className={styles.image}
              decoding="async"
            />
          </figure>
        </button>
      </li>
    ))}
  </ul>
);
