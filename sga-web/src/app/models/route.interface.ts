export interface Route {
  id?: string;
  name: string;
  coordinates: Coordinate[];
}

export interface Coordinate {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  icon: string;
}