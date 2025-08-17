import { useEffect, useState } from "react";
import SpaceCard from "./SpaceCard";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Zap } from "lucide-react";

interface NeoObject {
  id: string;
  name: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
}

const NeoTracker = () => {
  const [neoData, setNeoData] = useState<NeoObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeoData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
        );
        const data = await response.json();
        
        const todayObjects = data.near_earth_objects?.[today] || [];
        setNeoData(todayObjects.slice(0, 5)); // Show top 5
      } catch (error) {
        console.error('Error fetching NEO data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNeoData();
  }, []);

  if (loading) {
    return (
      <SpaceCard title="Near Earth Objects Today" className="animate-pulse">
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
      </SpaceCard>
    );
  }

  return (
    <SpaceCard title="Near Earth Objects Today" className="relative">
      <div className="absolute top-4 right-4">
        <Zap className="w-6 h-6 text-accent animate-pulse" />
      </div>
      
      {neoData.length === 0 ? (
        <p className="text-muted-foreground">No NEO data available for today.</p>
      ) : (
        <div className="space-y-4">
          {neoData.map((neo) => {
            const approach = neo.close_approach_data[0];
            const diameter = Math.round(
              (neo.estimated_diameter.meters.estimated_diameter_min + 
               neo.estimated_diameter.meters.estimated_diameter_max) / 2
            );
            
            return (
              <div key={neo.id} className="p-3 bg-muted/50 rounded-lg border-l-4 border-l-primary">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm text-foreground line-clamp-1">
                    {neo.name.replace(/[()]/g, '')}
                  </h4>
                  {neo.is_potentially_hazardous_asteroid && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Hazardous
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Diameter:</span>
                    <div className="font-mono text-accent">{diameter}m</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Speed:</span>
                    <div className="font-mono text-secondary">
                      {Math.round(parseFloat(approach.relative_velocity.kilometers_per_hour)).toLocaleString()} km/h
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Miss Distance:</span>
                    <div className="font-mono text-primary">
                      {Math.round(parseFloat(approach.miss_distance.kilometers)).toLocaleString()} km
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border/50">
            Data from NASA Near Earth Object Web Service
          </div>
        </div>
      )}
    </SpaceCard>
  );
};

export default NeoTracker;