import { useEffect, useState } from "react";
import SpaceCard from "./SpaceCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    name: string;
    full_name: string;
  };
  rover: {
    name: string;
  };
}

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarsPhotos = async () => {
      try {
        const response = await fetch(
          'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=DEMO_KEY'
        );
        const data = await response.json();
        setPhotos(data.latest_photos?.slice(0, 10) || []);
      } catch (error) {
        console.error('Error fetching Mars photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarsPhotos();
  }, []);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (loading) {
    return (
      <SpaceCard title="Mars Rover Latest Photos" className="animate-pulse">
        <div className="h-64 bg-muted rounded-lg mb-4" />
        <div className="h-4 bg-muted rounded mb-2" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </SpaceCard>
    );
  }

  if (photos.length === 0) {
    return (
      <SpaceCard title="Mars Rover Latest Photos">
        <p className="text-muted-foreground">No recent photos available.</p>
      </SpaceCard>
    );
  }

  const currentPhoto = photos[currentIndex];

  return (
    <SpaceCard title="Mars Rover Latest Photos" className="relative">
      <div className="absolute top-4 right-4">
        <Camera className="w-6 h-6 text-destructive animate-float" />
      </div>
      
      <div className="relative mb-4">
        <img 
          src={currentPhoto.img_src} 
          alt={`Mars photo by ${currentPhoto.rover.name}`}
          className="w-full h-64 object-cover rounded-lg"
        />
        
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={prevPhoto}
            className="bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={nextPhoto}
            className="bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-foreground">{currentPhoto.rover.name} Rover</h4>
            <p className="text-sm text-muted-foreground">{currentPhoto.camera.full_name}</p>
          </div>
          <span className="text-xs text-muted-foreground">{currentPhoto.earth_date}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Photo {currentIndex + 1} of {photos.length}
          </span>
          <Button size="sm" variant="outline" asChild>
            <a href={currentPhoto.img_src} target="_blank" rel="noopener noreferrer">
              Full Size
            </a>
          </Button>
        </div>
      </div>
    </SpaceCard>
  );
};

export default MarsRoverPhotos;