import { useState } from "react";
import SpaceCard from "./SpaceCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Rocket, Flag } from "lucide-react";

interface Astronaut {
  name: string;
  agency: string;
  mission: string;
  launch_date: string;
  days_in_space: number;
  nationality: string;
  role: string;
  status: "active" | "returning" | "training";
}

const AstronautTracker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [astronauts] = useState<Astronaut[]>([
    {
      name: "Oleg Kononenko",
      agency: "Roscosmos",
      mission: "Expedition 70/71",
      launch_date: "2023-09-15",
      days_in_space: 338,
      nationality: "Russia",
      role: "Commander",
      status: "active"
    },
    {
      name: "Matthew Dominick",
      agency: "NASA",
      mission: "Crew-8",
      launch_date: "2024-03-04",
      days_in_space: 166,
      nationality: "USA",
      role: "Commander",
      status: "active"
    },
    {
      name: "Nicolai Chub",
      agency: "Roscosmos",
      mission: "Expedition 70/71",
      launch_date: "2023-09-15",
      days_in_space: 338,
      nationality: "Russia",
      role: "Flight Engineer",
      status: "active"
    },
    {
      name: "Tracy Caldwell Dyson",
      agency: "NASA",
      mission: "Expedition 70/71",
      launch_date: "2024-03-23",
      days_in_space: 147,
      nationality: "USA",
      role: "Flight Engineer",
      status: "returning"
    },
    {
      name: "Michael Barratt",
      agency: "NASA",
      mission: "Crew-8",
      launch_date: "2024-03-04",
      days_in_space: 166,
      nationality: "USA",
      role: "Mission Specialist",
      status: "active"
    },
    {
      name: "Alexander Grebenkin",
      agency: "Roscosmos",
      mission: "Expedition 70/71",
      launch_date: "2023-09-15",
      days_in_space: 338,
      nationality: "Russia",
      role: "Flight Engineer",
      status: "active"
    }
  ]);

  const astronaut = astronauts[currentIndex];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-accent";
      case "returning": return "text-primary";
      case "training": return "text-secondary";
      default: return "text-muted-foreground";
    }
  };

  const nextAstronaut = () => {
    setCurrentIndex((prev) => (prev + 1) % astronauts.length);
  };

  const prevAstronaut = () => {
    setCurrentIndex((prev) => (prev - 1 + astronauts.length) % astronauts.length);
  };

  const getCountryFlag = (nationality: string) => {
    switch (nationality) {
      case "USA": return "🇺🇸";
      case "Russia": return "🇷🇺";
      case "Japan": return "🇯🇵";
      case "Germany": return "🇩🇪";
      case "Canada": return "🇨🇦";
      default: return "🌍";
    }
  };

  return (
    <SpaceCard title="Astronauts in Space" className="relative">
      <div className="absolute top-4 right-4">
        <Users className="w-6 h-6 text-secondary animate-float" />
      </div>
      
      <div className="space-y-4">
        {/* Astronaut Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">{getCountryFlag(astronaut.nationality)}</span>
            <h4 className="text-lg font-bold text-foreground">{astronaut.name}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{astronaut.agency} • {astronaut.role}</p>
        </div>
        
        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge className={`${getStatusColor(astronaut.status)} bg-current/20`}>
            {astronaut.status.toUpperCase()}
          </Badge>
        </div>
        
        {/* Mission Info */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Rocket className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Current Mission</p>
              <p className="text-sm font-medium">{astronaut.mission}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Calendar className="w-4 h-4 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Launch Date</p>
              <p className="text-sm font-medium">{astronaut.launch_date}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Flag className="w-4 h-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Days in Space</p>
              <p className="text-sm font-medium">{astronaut.days_in_space} days</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center pt-2">
          <Button size="sm" variant="outline" onClick={prevAstronaut}>
            ← Previous
          </Button>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} of {astronauts.length}
          </span>
          <Button size="sm" variant="outline" onClick={nextAstronaut}>
            Next →
          </Button>
        </div>
        
        <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border/50">
          Currently aboard the International Space Station
        </div>
      </div>
    </SpaceCard>
  );
};

export default AstronautTracker;