import { API_CONFIG } from "./config";
import { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./types";

class WeatherAPI{
   private createUrl(
      endpoint:string,
      params:Record<string, string | number>){
         const searchParams = new URLSearchParams({
            appid:API_CONFIG.API_KEY,
           ...params,
         });

         return `${endpoint}?${searchParams.toString()}`;
      };

   private async fetchData<T>(url:string):Promise<T>{
      const response = await fetch(url);

      if(!response.ok){
         throw new Error(`HTTP error! status: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
   }

   async getCurrentWeather({lat,lon}:Coordinates):Promise<WeatherData>{
      const url = this.createUrl(
         `${API_CONFIG.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
         });
         return this.fetchData<WeatherData>(url);
   }

   async getForecast({lat,lon}:Coordinates):Promise<ForecastData>{
      const url = this.createUrl(
         `${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
         });
         return this.fetchData<ForecastData>(url);
   }

   async reverseGeocode({lat,lon}:Coordinates):Promise<GeocodingResponse[]>{
      const url = this.createUrl(
         `${API_CONFIG.GEO}/reverse`,{
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 1,//only one child
         });
         return this.fetchData<GeocodingResponse[]>(url);
   }
   async searchLocation(query: string):Promise<GeocodingResponse[]>{
      const url = this.createUrl(
         `${API_CONFIG.GEO}/direct`,{
            q: query,
            limit: "5",//only one child
         });
         return this.fetchData<GeocodingResponse[]>(url);
   }
}

export const weatherAPI = new WeatherAPI();
