import { useState } from "react";
import SpaceCard from "./SpaceCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, Calendar, MapPin, Clock } from "lucide-react";

interface Launch {
  mission: string;
  agency: string;
  vehicle: string;
  date: string;
  time: string;
  location: string;
  status: "scheduled" | "confirmed" | "delayed";
  description: string;
}

const UpcomingLaunches = () => {
  const [launches] = useState<Launch[]>([
    {
      mission: "Artemis II",
      agency: "NASA",
      vehicle: "SLS Block 1",
      date: "2025-09-12",
      time: "08:45 UTC",
      location: "Kennedy Space Center, FL",
      status: "confirmed",
      description: "First crewed mission around the Moon since Apollo 17"
    },
    {
      mission: "Starship IFT-6",
      agency: "SpaceX",
      vehicle: "Starship",
      date: "2024-09-15",
      time: "14:20 UTC",
      location: "Starbase, TX",
      status: "scheduled",
      description: "Integrated Flight Test with orbital refueling demonstration"
    },
    {
      mission: "Europa Clipper",
      agency: "NASA",
      vehicle: "Falcon Heavy",
      date: "2024-10-10",
      time: "16:30 UTC",
      location: "Kennedy Space Center, FL",
      status: "confirmed",
      description: "Mission to study Jupiter's moon Europa for signs of life"
    },
    {
      mission: "Crew-9",
      agency: "NASA/SpaceX",
      vehicle: "Falcon 9",
      date: "2024-08-24",
      time: "23:16 UTC",
      location: "Kennedy Space Center, FL",
      status: "delayed",
      description: "Crew rotation mission to the International Space Station"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-accent/20 text-accent";
      case "scheduled": return "bg-primary/20 text-primary";
      case "delayed": return "bg-destructive/20 text-destructive";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getTimeUntilLaunch = (date: string) => {
    const launchDate = new Date(date);
    const now = new Date();
    const diff = launchDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return "Past";
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `${days} days`;
  };

  return (
    <SpaceCard title="Upcoming Space Launches" className="relative">
      <div className="absolute top-4 right-4">
        <Rocket className="w-6 h-6 text-secondary animate-float" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {launches.map((launch, index) => {
          const countdown = getTimeUntilLaunch(launch.date);
          
          return (
            <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{launch.mission}</h4>
                  <p className="text-sm text-muted-foreground">{launch.agency} • {launch.vehicle}</p>
                </div>
                <Badge className={getStatusColor(launch.status)}>
                  {launch.status}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {launch.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-primary" />
                  <span>{launch.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-secondary" />
                  <span>{launch.time}</span>
                </div>
                <div className="flex items-center gap-1 col-span-2">
                  <MapPin className="w-3 h-3 text-accent" />
                  <span>{launch.location}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-primary">T-{countdown}</span>
                </div>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                  Watch Live
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 text-center">
        <Button size="sm" variant="outline" className="w-full">
          <Calendar className="w-4 h-4 mr-2" />
          View Launch Calendar
        </Button>
      </div>
    </SpaceCard>
  );
};

export default UpcomingLaunches;