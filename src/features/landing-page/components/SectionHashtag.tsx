import styles from "./SectionHashtag.module.css";

type SectionHashtagProps = {
  className?: string;
};

export const SectionHashtag = ({
  className = "",
}: SectionHashtagProps): JSX.Element => (
  <p className={`${styles.hashtag} ${className}`.trim()}>#EN2EAVOUR</p>
);
