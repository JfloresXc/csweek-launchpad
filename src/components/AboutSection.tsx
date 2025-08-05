import { Button } from "@/components/ui/button";

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
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-in-up">
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
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explora las últimas tendencias en tecnología a través de charlas, talleres y retos prácticos. 
            Un evento <span className="text-secondary font-semibold">100% gratuito</span>, virtual y con certificado de participación, 
            abierto a toda la comunidad.
          </p>
        </div>
      </div>
    </section>
  );
};