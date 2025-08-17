import { useEffect, useState } from "react";
import SpaceCard from "./SpaceCard";
import { Button } from "@/components/ui/button";
import { Satellite, MapPin, Clock } from "lucide-react";

interface IssData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

const IssTracker = () => {
  const [issData, setIssData] = useState<IssData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssPosition = async () => {
      try {
        const response = await fetch('https://api.open-notify.org/iss-now.json');
        const data = await response.json();
        
        setIssData({
          latitude: parseFloat(data.iss_position.latitude),
          longitude: parseFloat(data.iss_position.longitude),
          timestamp: data.timestamp * 1000
        });
      } catch (error) {
        console.error('Error fetching ISS position:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssPosition();
    const interval = setInterval(fetchIssPosition, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <SpaceCard title="ISS Live Tracker" className="animate-pulse">
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-2/3" />
          <div className="h-8 bg-muted rounded" />
        </div>
      </SpaceCard>
    );
  }

  return (
    <SpaceCard title="ISS Live Tracker" className="relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <Satellite className="w-6 h-6 text-primary animate-pulse" />
      </div>
      
      {issData ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <div>
                <div className="text-sm text-muted-foreground">Latitude</div>
                <div className="font-mono text-primary">{issData.latitude.toFixed(4)}°</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <div>
                <div className="text-sm text-muted-foreground">Longitude</div>
                <div className="font-mono text-primary">{issData.longitude.toFixed(4)}°</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-secondary" />
            <div>
              <div className="text-sm text-muted-foreground">Last Update</div>
              <div className="text-sm">{new Date(issData.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
          
          <Button 
            size="sm" 
            className="w-full cosmic-gradient text-white"
            onClick={() => {
              const url = `https://www.google.com/maps/@${issData.latitude},${issData.longitude},6z`;
              window.open(url, '_blank');
            }}
          >
            View on Map
          </Button>
          
          <div className="text-xs text-muted-foreground text-center">
            Altitude: ~408 km | Speed: ~27,600 km/h
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">Unable to load ISS position data.</p>
      )}
    </SpaceCard>
  );
};

export default IssTracker;