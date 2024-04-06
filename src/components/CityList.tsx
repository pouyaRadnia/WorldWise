import { ICitisesContext, ICity } from "../types/cities";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

export default function CityList() {
  const { loading, cities } = useCities() as ICitisesContext;

  if (loading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clickingon the map" />;
  return (
    <ul className={styles.cityList}>
      {cities?.map((city: ICity) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
