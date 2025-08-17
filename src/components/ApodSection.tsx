import { useEffect, useState } from "react";
import SpaceCard from "./SpaceCard";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ApodData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  media_type: string;
}

const ApodSection = () => {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        const data = await response.json();
        setApodData(data);
      } catch (error) {
        console.error('Error fetching APOD:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApod();
  }, []);

  if (loading) {
    return (
      <SpaceCard title="Astronomy Picture of the Day" className="animate-pulse">
        <div className="h-64 bg-muted rounded-lg mb-4" />
        <div className="h-4 bg-muted rounded mb-2" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </SpaceCard>
    );
  }

  if (!apodData) {
    return (
      <SpaceCard title="Astronomy Picture of the Day">
        <p className="text-muted-foreground">Unable to load today's astronomy picture.</p>
      </SpaceCard>
    );
  }

  return (
    <SpaceCard title="Astronomy Picture of the Day" glowing>
      {apodData.media_type === 'image' ? (
        <img 
          src={apodData.url} 
          alt={apodData.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-muted rounded-lg mb-4 flex items-center justify-center">
          <p className="text-muted-foreground">Video content available</p>
        </div>
      )}
      
      <h4 className="text-lg font-semibold mb-2 text-foreground">{apodData.title}</h4>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {apodData.explanation}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{apodData.date}</span>
        <Button size="sm" variant="outline" asChild>
          <a href={apodData.hdurl || apodData.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full Size
          </a>
        </Button>
      </div>
    </SpaceCard>
  );
};

export default ApodSection;