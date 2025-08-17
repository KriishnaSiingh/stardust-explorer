import { useEffect, useState } from "react";
import SpaceCard from "./SpaceCard";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpaceNews {
  title: string;
  excerpt: string;
  date: string;
  source: string;
  category: string;
}

const SpaceNews = () => {
  const [news] = useState<SpaceNews[]>([
    {
      title: "NASA's Artemis III Mission Plans Lunar Landing for 2026",
      excerpt: "NASA continues preparations for the first crewed lunar landing since Apollo 17, with new spacesuit designs and landing site selections.",
      date: "2024-08-15",
      source: "NASA",
      category: "Missions"
    },
    {
      title: "SpaceX Starship Completes Successful Orbital Test Flight",
      excerpt: "The latest Starship test demonstrated key capabilities including in-flight refueling and precise landing techniques for future Mars missions.",
      date: "2024-08-14",
      source: "SpaceX",
      category: "Technology"
    },
    {
      title: "James Webb Discovers Earth-like Exoplanet with Potential Atmosphere",
      excerpt: "JWST has identified a potentially habitable exoplanet 40 light-years away with signs of water vapor in its atmosphere.",
      date: "2024-08-13",
      source: "ESA",
      category: "Discovery"
    },
    {
      title: "International Space Station Extends Operations Through 2031",
      excerpt: "NASA and international partners announce extension of ISS operations, ensuring continued microgravity research and commercial opportunities.",
      date: "2024-08-12",
      source: "NASA",
      category: "ISS"
    },
    {
      title: "China's Chang'e 6 Returns with First-Ever Far Side Moon Samples",
      excerpt: "Historic mission brings back lunar samples from the far side of the Moon, opening new frontiers in lunar geology research.",
      date: "2024-08-11",
      source: "CNSA",
      category: "Exploration"
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Missions": return "bg-primary/20 text-primary";
      case "Technology": return "bg-secondary/20 text-secondary";
      case "Discovery": return "bg-accent/20 text-accent";
      case "ISS": return "bg-destructive/20 text-destructive";
      case "Exploration": return "bg-muted-foreground/20 text-muted-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <SpaceCard title="Latest Space News" className="relative">
      <div className="absolute top-4 right-4">
        <Calendar className="w-6 h-6 text-primary animate-pulse" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {news.map((article, index) => (
          <div key={index} className="p-4 bg-muted/30 rounded-lg border-l-4 border-l-primary/50 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{article.source}</span>
            </div>
            
            <h4 className="font-semibold text-sm mb-2 line-clamp-2 text-foreground">
              {article.title}
            </h4>
            
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {article.excerpt}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{article.date}</span>
              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                <ExternalLink className="w-3 h-3 mr-1" />
                Read More
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 text-center">
        <Button size="sm" variant="outline" className="w-full">
          <Rocket className="w-4 h-4 mr-2" />
          View All Space News
        </Button>
      </div>
    </SpaceCard>
  );
};

export default SpaceNews;