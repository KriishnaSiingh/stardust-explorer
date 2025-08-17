import { useState, useEffect } from "react";
import SpaceCard from "./SpaceCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Zap, Shield, Sun, Radio } from "lucide-react";

interface SpaceWeatherData {
  solar_activity: "low" | "moderate" | "high";
  geomagnetic_activity: "quiet" | "unsettled" | "storm";
  solar_wind_speed: number;
  kp_index: number;
  aurora_activity: "none" | "low" | "moderate" | "high";
  radio_blackout: "none" | "minor" | "moderate" | "strong";
}

const SpaceWeather = () => {
  const [weatherData] = useState<SpaceWeatherData>({
    solar_activity: "moderate",
    geomagnetic_activity: "unsettled",
    solar_wind_speed: 425,
    kp_index: 3.2,
    aurora_activity: "moderate",
    radio_blackout: "minor"
  });

  const getActivityColor = (level: string) => {
    switch (level) {
      case "low": case "quiet": case "none": return "text-accent";
      case "moderate": case "unsettled": case "minor": return "text-primary";
      case "high": case "storm": case "strong": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getActivityProgress = (level: string) => {
    switch (level) {
      case "low": case "quiet": case "none": return 25;
      case "moderate": case "unsettled": case "minor": return 60;
      case "high": case "storm": case "strong": return 90;
      default: return 0;
    }
  };

  const formatKpIndex = (kp: number) => {
    return kp.toFixed(1);
  };

  return (
    <SpaceCard title="Space Weather Monitor" className="relative">
      <div className="absolute top-4 right-4">
        <Sun className="w-6 h-6 text-primary animate-pulse-glow" />
      </div>
      
      <div className="space-y-4">
        {/* Solar Activity */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Solar Activity</span>
            </div>
            <Badge className={`${getActivityColor(weatherData.solar_activity)} bg-current/20`}>
              {weatherData.solar_activity.toUpperCase()}
            </Badge>
          </div>
          <Progress value={getActivityProgress(weatherData.solar_activity)} className="h-2" />
        </div>
        
        {/* Geomagnetic Activity */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Geomagnetic Field</span>
            </div>
            <Badge className={`${getActivityColor(weatherData.geomagnetic_activity)} bg-current/20`}>
              {weatherData.geomagnetic_activity.toUpperCase()}
            </Badge>
          </div>
          <Progress value={getActivityProgress(weatherData.geomagnetic_activity)} className="h-2" />
        </div>
        
        {/* Kp Index */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Kp Index</span>
            </div>
            <p className="text-lg font-bold text-foreground">{formatKpIndex(weatherData.kp_index)}</p>
            <p className="text-xs text-muted-foreground">Planetary magnetic disturbance</p>
          </div>
          
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Solar Wind</span>
            </div>
            <p className="text-lg font-bold text-foreground">{weatherData.solar_wind_speed}</p>
            <p className="text-xs text-muted-foreground">km/s velocity</p>
          </div>
        </div>
        
        {/* Aurora Activity */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Aurora Activity</span>
            </div>
            <Badge className={`${getActivityColor(weatherData.aurora_activity)} bg-current/20`}>
              {weatherData.aurora_activity.toUpperCase()}
            </Badge>
          </div>
          <Progress value={getActivityProgress(weatherData.aurora_activity)} className="h-2" />
        </div>
        
        {/* Radio Blackout */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Radio Blackout</span>
            </div>
            <Badge className={`${getActivityColor(weatherData.radio_blackout)} bg-current/20`}>
              {weatherData.radio_blackout.toUpperCase()}
            </Badge>
          </div>
          <Progress value={getActivityProgress(weatherData.radio_blackout)} className="h-2" />
        </div>
        
        <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border/50">
          Live space weather conditions affecting Earth
        </div>
      </div>
    </SpaceCard>
  );
};

export default SpaceWeather;