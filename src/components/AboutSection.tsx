import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const themes = [
  {
    title: "Inteligencia Artificial",
    icon: "🤖",
    color: "ai-green",
    description: "Explora las últimas tendencias en IA y machine learning",
  },
  {
    title: "Ciberseguridad",
    icon: "🛡️",
    color: "security-red",
    description: "Aprende sobre protección digital y seguridad informática",
  },
  {
    title: "Big Data",
    icon: "📊",
    color: "data-orange",
    description: "Descubre el poder del análisis de datos masivos",
  },
  {
    title: "Desarrollo de Software",
    icon: "</>" as string,
    color: "dev-cyan",
    description: "Domina las mejores prácticas de desarrollo moderno",
  },
];

export const AboutSection = () => {
  const navigate = useNavigate();
  
  return (
    <section id="about" className="py-20 px-4 bg-muted/10">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-in-up">
          <div className="inline-flex items-center gap-2 bg-csweek-secondary/10 text-csweek-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            Sobre el Evento
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Una semana de{" "}
            <span className="text-secondary">innovación</span> y{" "}
            <span className="text-primary">aprendizaje</span>
          </h2>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {themes.map((theme, index) => (
            <div
              key={theme.title}
              className="group animate-slide-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Button variant="theme" className="w-full h-auto p-6 flex-col gap-4 whitespace-normal min-h-[200px] justify-start cursor-default">
                <div 
                  className={`w-16 h-16 rounded-2xl bg-${theme.color}/20 flex items-center justify-center group-hover:bg-${theme.color}/30 transition-colors`}
                >
                  <span className="text-3xl">{theme.icon}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">{theme.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{theme.description}</p>
                </div>
              </Button>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Explora las últimas tendencias en tecnología a través de charlas, talleres y retos prácticos. 
            Un evento <span className="text-secondary font-semibold">100% gratuito</span>, virtual y con certificado de participación, 
            abierto a toda la comunidad.
          </p>
          
          {/* Learn More Button */}
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/about')}
            className="animate-glow-pulse group"
          >
            Conoce más sobre el evento
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};