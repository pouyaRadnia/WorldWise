import { useCities } from "../contexts/CitiesContext";
import { ICitisesContext, ICity } from "../types/cities";

import styles from "./CountriesList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountriesList() {
  const { loading, cities } = useCities() as ICitisesContext;
  if (loading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clickingon the map" />;

  const countries: ICity[] | [] = cities.reduce((arr: any, city: ICity) => {
    if (!arr?.map((el: ICity) => el?.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log();
  return (
    <ul className={styles.countryList}>
      {countries.map((country: ICity) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
