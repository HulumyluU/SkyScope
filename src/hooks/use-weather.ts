import type { Coordinates} from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
   weather:(coords: Coordinates) => ["weather", coords] as const,
   forecast:(coords: Coordinates) => ["forecast", coords] as const,
   location:(coords: Coordinates) => ["location", coords] as const,
   search:(query: string) => ["location-search", query] as const,
}

export function useWeatherQuery(coordinates:Coordinates | null){
   return useQuery({
      queryKey: WEATHER_KEYS.weather(coordinates?? { lat: 0, lon: 0 }),
      queryFn:()=>coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
      enabled: !!coordinates, //will be set to false if corrdinates are not provided
   });
}


export function useForecastQuery(coordinates:Coordinates | null){
   return useQuery({
      queryKey: WEATHER_KEYS.forecast(coordinates?? { lat: 0, lon: 0 }),
      queryFn:()=>coordinates ? weatherAPI.getForecast(coordinates) : null,
      enabled: !!coordinates, //will be set to false if corrdinates are not provided
   });
}


export function useReverseGeocodeQuery(coordinates:Coordinates | null){
   return useQuery({
      queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
      queryFn:()=>coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
      enabled: !!coordinates, //will be set to false if corrdinates are not provided
   });
}

export function useLocationSearch(query: string){
   return useQuery({
      queryKey: WEATHER_KEYS.search(query),
      queryFn:()=> weatherAPI.searchLocation(query),
      enabled: query.length >= 2, //will work only if there are more than 2 letters
   });
}