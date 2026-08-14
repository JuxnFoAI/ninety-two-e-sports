import { getCountryFlagCode } from "../../lib/countryFlags";
import styles from "./CountryFlag.module.css";

type CountryFlagProps = {
  country: string;
};

/** Compact decorative flag beside a country label. */
export const CountryFlag = ({
  country,
}: CountryFlagProps): JSX.Element | null => {
  const code = getCountryFlagCode(country);
  if (!code) {
    return null;
  }

  return (
    <img
      className={styles.flag}
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={16}
      height={12}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
};
