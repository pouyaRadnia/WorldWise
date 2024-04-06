import { ICity } from "../types/cities";
import styles from "./CountryItem.module.css";

function CountryItem({ country }: { country: ICity }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
