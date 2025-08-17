import { useState } from "react";
import SpaceCard from "./SpaceCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Globe, Thermometer, Wind } from "lucide-react";

interface Exoplanet {
  name: string;
  distance: string;
  size: string;
  temperature: string;
  habitability: "high" | "medium" | "low";
  discovery_year: string;
  star_type: string;
  atmosphere: string;
}

const ExoplanetExplorer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exoplanets] = useState<Exoplanet[]>([
    {
      name: "Kepler-452b",
      distance: "1,400 light-years",
      size: "1.6× Earth",
      temperature: "265K (-8°C)",
      habitability: "high",
      discovery_year: "2015",
      star_type: "G-type (Sun-like)",
      atmosphere: "Potentially thick atmosphere with greenhouse gases"
    },
    {
      name: "TRAPPIST-1e",
      distance: "40 light-years",
      size: "0.92× Earth",
      temperature: "251K (-22°C)",
      habitability: "high",
      discovery_year: "2017",
      star_type: "M-dwarf (Red dwarf)",
      atmosphere: "May retain atmosphere, possible water vapor"
    },
    {
      name: "TOI-715 b",
      distance: "137 light-years",
      size: "1.55× Earth",
      temperature: "240K (-33°C)",
      habitability: "medium",
      discovery_year: "2024",
      star_type: "M-dwarf (Red dwarf)",
      atmosphere: "Under investigation by James Webb"
    },
    {
      name: "K2-18 b",
      distance: "124 light-years",
      size: "8.6× Earth",
      temperature: "279K (6°C)",
      habitability: "medium",
      discovery_year: "2015",
      star_type: "M-dwarf (Red dwarf)",
      atmosphere: "Confirmed water vapor, possible clouds"
    }
  ]);

  const planet = exoplanets[currentIndex];

  const getHabitabilityColor = (level: string) => {
    switch (level) {
      case "high": return "text-accent";
      case "medium": return "text-primary";
      case "low": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getHabitabilityProgress = (level: string) => {
    switch (level) {
      case "high": return 85;
      case "medium": return 60;
      case "low": return 25;
      default: return 0;
    }
  };

  const nextPlanet = () => {
    setCurrentIndex((prev) => (prev + 1) % exoplanets.length);
  };

  const prevPlanet = () => {
    setCurrentIndex((prev) => (prev - 1 + exoplanets.length) % exoplanets.length);
  };

  return (
    <SpaceCard title="Exoplanet Explorer" className="relative">
      <div className="absolute top-4 right-4">
        <Globe className="w-6 h-6 text-accent animate-orbit" />
      </div>
      
      <div className="space-y-4">
        {/* Planet Header */}
        <div className="text-center">
          <h4 className="text-xl font-bold text-foreground mb-1">{planet.name}</h4>
          <p className="text-sm text-muted-foreground">Discovered in {planet.discovery_year}</p>
        </div>
        
        {/* Planet Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="text-sm font-medium">{planet.distance}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Size</p>
                <p className="text-sm font-medium">{planet.size}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-destructive" />
              <div>
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="text-sm font-medium">{planet.temperature}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Star Type</p>
                <p className="text-sm font-medium">{planet.star_type}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Habitability */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Habitability Score</span>
            <Badge className={`${getHabitabilityColor(planet.habitability)} bg-current/20`}>
              {planet.habitability.toUpperCase()}
            </Badge>
          </div>
          <Progress value={getHabitabilityProgress(planet.habitability)} className="h-2" />
        </div>
        
        {/* Atmosphere */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Atmosphere</p>
          <p className="text-sm">{planet.atmosphere}</p>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center pt-2">
          <Button size="sm" variant="outline" onClick={prevPlanet}>
            ← Previous
          </Button>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} of {exoplanets.length}
          </span>
          <Button size="sm" variant="outline" onClick={nextPlanet}>
            Next →
          </Button>
        </div>
      </div>
    </SpaceCard>
  );
};

export default ExoplanetExplorer;