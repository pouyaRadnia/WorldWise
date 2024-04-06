// 1 dorost kardane context ba create context
// 2 dorsot kardane componente providet ba propse childern
// 3 gharar dadane tamame state ha dar dakhele component
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICitisesContext } from "../types/cities";

const CitiseContext = createContext<ICitisesContext | null>(null);
const BASE_URL = "http://localhost:9000";
function CitiseProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Ther was an error to loading data");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <CitiseContext.Provider value={{ cities, loading }}>
      {children}
    </CitiseContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiseContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { useCities, CitiseProvider };
