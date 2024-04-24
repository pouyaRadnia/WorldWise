// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";

import BackButton from "./ButtonBack";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode?: any) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date() as any);
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeaoLocation, setIsLoadingGeaoLocation] = useState(false);
  const [geocodingError, setGeoCodingError] = useState("");
  const { mapLat, mapLng } = useUrlPosition();
  useEffect(
    function () {
      if (!mapLat && !mapLng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeaoLocation(true);
          setGeoCodingError("");
          const res = await fetch(
            `${Base_Url}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error("that dos't seem to be a city.Click somwhere else");
          setCityName(data.city || data.locality || "");
          setCountry(data.country);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err: any) {
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeaoLocation(false);
        }
      }
      fetchCityData();
    },
    [mapLat, mapLng]
  );
  if (isLoadingGeaoLocation) return <Spinner />;
  if (!mapLng && !mapLat)
    return <Message message="Start by clicking somewhere on the map" />;
  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e: any) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}} type="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
