import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

export const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-hero flex items-center justify-center">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-40"></div>
      
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-ai-green/20 rounded-2xl flex items-center justify-center animate-float">
          <span className="text-2xl">🤖</span>
        </div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-security-red/20 rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
          <span className="text-2xl">🛡️</span>
        </div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-data-orange/20 rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
          <span className="text-2xl">📊</span>
        </div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-dev-cyan/20 rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '3s' }}>
          <span className="text-2xl">&lt;/&gt;</span>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 py-16 md:py-0">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-8 animate-fade-in">
          {/* Main Title */}
          <div className="space-y-6 md:space-y-4">
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-primary">CS</span>
              <br />
              <span className="text-secondary">WEEK</span>{" "}
              <span className="text-foreground">2025</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Conectando mentes, creando tecnología
            </p>
          </div>

          {/* Event Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-3 bg-gradient-card border border-border rounded-lg p-4 shadow-card">
              <Calendar className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p className="font-semibold">11 al 15 de Agosto</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gradient-card border border-border rounded-lg p-4 shadow-card">
              <Clock className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Hora</p>
                <p className="font-semibold">5:00 PM - 9:30 PM (GMT-5)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gradient-card border border-border rounded-lg p-4 shadow-card">
              <Video className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Plataforma</p>
                <p className="font-semibold">Google Meet</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-16 md:pt-8">
            <Button 
              variant="hero" 
              size="xl"
              className="animate-glow-pulse"
              onClick={() => window.open('https://lu.ma/alaqbwzh?fbclid=PAZXh0bgNhZW0CMTEAAadzewIeuJoItjKgJQcFxaT14caJkEyn12FiJxGIEY0HXhxgXxZAmlsuwJsg7Q_aem_n6g6ZINLkRx0bPK5q8spGw', '_blank')}
            >
              Regístrate ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};