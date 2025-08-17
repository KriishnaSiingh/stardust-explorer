import { Button } from "@/components/ui/button";
import { Rocket, Satellite, Camera, Globe, Star } from "lucide-react";

const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="space-card px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg cosmic-gradient bg-clip-text text-transparent">
              Space Explorer
            </span>
          </div>
          
          <div className="h-6 w-px bg-border" />
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('apod')}
              className="hover:bg-primary/10"
            >
              <Star className="w-4 h-4 mr-2" />
              APOD
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('iss')}
              className="hover:bg-primary/10"
            >
              <Satellite className="w-4 h-4 mr-2" />
              ISS
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('mars')}
              className="hover:bg-primary/10"
            >
              <Camera className="w-4 h-4 mr-2" />
              Mars
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('neo')}
              className="hover:bg-primary/10"
            >
              <Globe className="w-4 h-4 mr-2" />
              NEO
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;