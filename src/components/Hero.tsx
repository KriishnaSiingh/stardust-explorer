import { Button } from "@/components/ui/button";
import spaceHero from "@/assets/space-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${spaceHero})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      <div className="absolute top-32 right-20 w-1 h-1 bg-accent rounded-full animate-float" />
      <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 cosmic-gradient bg-clip-text text-transparent animate-pulse-glow">
          SPACE EXPLORER
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover the cosmos through NASA's cutting-edge data. Real-time space exploration at your fingertips.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="cosmic-gradient text-white hover:opacity-90 transition-opacity stellar-glow">
            Explore Space Data
          </Button>
          <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10">
            Track ISS Live
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">450+</div>
            <div className="text-sm text-muted-foreground">Active Missions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">24/7</div>
            <div className="text-sm text-muted-foreground">Live Tracking</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">∞</div>
            <div className="text-sm text-muted-foreground">Discoveries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;