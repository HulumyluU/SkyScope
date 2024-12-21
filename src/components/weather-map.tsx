import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface WeatherMapProps {
  data?: {
    coord: {
      lat: number;
      lon: number;
    };
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
    }>;
  };
  locationName?: {
    name: string;
    country: string;
  };
}

const WeatherMap = ({ data, locationName }: WeatherMapProps) => {
  if (!data) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="h-[300px] w-full flex items-center justify-center bg-muted rounded-lg">
            <p className="text-muted-foreground">Loading map data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { lat, lon } = data.coord;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0]?.description || 'No data';
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4" />
            <h3 className="font-medium">Location Map</h3>
          </div>
          
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden border bg-background">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 1},${lat - 1},${lon + 1},${lat + 1}&layer=mapnik&marker=${lat},${lon}`}
              className="w-full h-full border-0"
              title="Weather Map"
              loading="lazy"
            />

            <div className="absolute bottom-0 left-0 right-0 p-3 bg-background/95 backdrop-blur-sm border-t">
              <p className="text-sm font-medium">
                {locationName?.name || 'Unknown Location'}{locationName?.country ? `, ${locationName.country}` : ''}
              </p>
              <p className="text-xs text-muted-foreground">
                {description} • {temp}°C
              </p>
              <p className="text-xs text-muted-foreground">
                Lat: {lat.toFixed(3)}° • Lon: {lon.toFixed(3)}°
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherMap;