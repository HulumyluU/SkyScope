import CurrentWeather from "@/components/current-weather";
import { FavoriteCities } from "@/components/favorite-cities";
import HourlyTemprature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import WeatherMap from "@/components/weather-map";
import { useGeolocation } from "@/hooks/use-geolocation"
import { useReverseGeocodeQuery, useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertCircle, MapPin, RefreshCw } from "lucide-react"


const WeatherDashboard = () => {
   const {coordinates, error: locationError, getLocation, isLoading: locationLoading} = useGeolocation();

   const weatherQuery = useWeatherQuery(coordinates); // import from @open-weather-map/api-client
   const forecastQuery = useForecastQuery(coordinates);
   const locationQuery = useReverseGeocodeQuery(coordinates);


   const handleRefresh = () => {
      getLocation();
      if(coordinates){
         weatherQuery.refetch();
         forecastQuery.refetch();
         locationQuery.refetch();
      }
   }
   if(locationLoading){
      return <WeatherSkeleton />
   }

   if(locationError){ 
      return (
         <Alert variant="destructive"> {/*imported from shadcn/ui*/}
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
            <p>{locationError}</p>
            <Button onClick={getLocation} variant={"outline"} className="w-fit">
               <MapPin className="h-4 w-4 mr-2" />
               Refresh Location
            </Button>
            </AlertDescription>
         </Alert>
      );
   }

   if(!coordinates){ 
      return (
         <Alert variant="destructive"> {/*imported from shadcn/ui*/}
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location is Required on this website</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
            <p>We cannot show a weather in your region without your permition</p>
            <Button onClick={getLocation} variant={"outline"} className="w-fit">
               <MapPin className="h-4 w-4 mr-2" />
               Refresh Location
            </Button>
            </AlertDescription>
         </Alert>
      )
   }

   const locationName = locationQuery.data?.[0];
   if(weatherQuery.error || forecastQuery.error){
      return (
         <Alert variant="destructive"> {/*imported from shadcn/ui*/}
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
            <p>Faild to fetch weather data</p>
            <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
               <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Page
            </Button>
            </AlertDescription>
         </Alert>
      );
   }

   if(!weatherQuery.data ||!forecastQuery.data){
      return <WeatherSkeleton />
   }
   
  return (<div className="space-y-4">
   <FavoriteCities />
   <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight">My Location</h1>
      <Button 
         variant={"outline"}
         size={"icon"}
         onClick={handleRefresh}
         disabled={weatherQuery.isFetching || forecastQuery.isFetching}
      >
         <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching?"animate-spin" : ""}`}/>
      </Button>
   </div>
      <div className="grid gap-6">
         <div className="flex flex-col lg:flex-row gap-4">
            <CurrentWeather 
               data={weatherQuery.data}
               locationName={locationName}
            />
            <HourlyTemprature data={forecastQuery.data}/>
         </div>

         <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="grid gap-6">
               <WeatherDetails data={weatherQuery.data}/>
               <WeatherMap 
                  data={weatherQuery.data}
                  locationName={locationName}
               />
            </div>
            <WeatherForecast data={forecastQuery.data}/>
         </div>
      </div>
  </div>
  )
}

export default WeatherDashboard
