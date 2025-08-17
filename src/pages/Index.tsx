import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import ApodSection from "@/components/ApodSection";
import IssTracker from "@/components/IssTracker";
import MarsRoverPhotos from "@/components/MarsRoverPhotos";
import NeoTracker from "@/components/NeoTracker";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Data Sections */}
      <div className="container mx-auto px-6 py-16 space-y-16">
        {/* Featured Section */}
        <section id="apod" className="scroll-mt-24">
          <h2 className="text-4xl font-bold text-center mb-12 cosmic-gradient bg-clip-text text-transparent">
            Daily Space Discovery
          </h2>
          <div className="max-w-4xl mx-auto">
            <ApodSection />
          </div>
        </section>
        
        {/* Live Data Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div id="iss" className="scroll-mt-24">
            <IssTracker />
          </div>
          
          <div id="mars" className="scroll-mt-24">
            <MarsRoverPhotos />
          </div>
          
          <div id="neo" className="scroll-mt-24">
            <NeoTracker />
          </div>
        </section>
        
        {/* Footer */}
        <footer className="text-center py-12 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <p className="text-muted-foreground">
              Powered by NASA Open Data APIs
            </p>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Explore the cosmos through real-time data from NASA's cutting-edge missions. 
            All data is fetched live from official NASA APIs.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
