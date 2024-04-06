export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
  id: number;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface ICitisesContext {
  cities: ICity[];
  loading: boolean;
  currentCity: ICity;
  getCity: (id: string) => void;
}
