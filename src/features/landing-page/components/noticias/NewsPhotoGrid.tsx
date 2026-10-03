import type { NewsPhoto } from "../../lib/newsPhotos";
import styles from "./NewsPhotoGrid.module.css";

type NewsPhotoGridProps = {
  photos: readonly NewsPhoto[];
  onSelect: (id: string) => void;
};

/** Static photo grid. Clicking a photo opens the article overlay. */
export const NewsPhotoGrid = ({
  photos,
  onSelect,
}: NewsPhotoGridProps): JSX.Element => (
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
              loading="lazy"
              decoding="async"
            />
          </figure>
        </button>
      </li>
    ))}
  </ul>
);
