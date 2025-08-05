import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, CheckCircle } from "lucide-react";
import { WhatsAppInlineButton } from "@/components/WhatsAppButton";

/**
 * Sección de registro para el evento CS WEEK 2025
 * Incluye información del evento y call-to-action principal
 */
export const RegisterSection = () => {
  const benefits = [
    "Acceso completo a todas las charlas y talleres",
    "Certificado de participación oficial",
    "Networking con profesionales del sector",
    "Material exclusivo y recursos descargables",
    "Acceso a la comunidad privada de participantes"
  ];

  return (
    <section id="register" className="py-20 px-4 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-16 animate-slide-in-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              ¡Asegura tu{" "}
              <span className="text-primary">lugar</span> en{" "}
              <span className="text-secondary">CS WEEK 2025</span>!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Únete a cientos de estudiantes y profesionales en el evento tecnológico más importante del año.
            </p>
          </div>

          {/* Event Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevation transition-smooth group">
              <Calendar className="w-8 h-8 text-secondary mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-2">Fechas</h3>
              <p className="text-muted-foreground">11 al 15 de Agosto</p>
              <p className="text-sm text-muted-foreground mt-1">5 días intensivos</p>
            </div>
            
            <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevation transition-smooth group">
              <Clock className="w-8 h-8 text-secondary mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-2">Horario</h3>
              <p className="text-muted-foreground">5:00 PM - 9:30 PM</p>
              <p className="text-sm text-muted-foreground mt-1">GMT-5 (Hora Perú)</p>
            </div>
            
            <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevation transition-smooth group">
              <Video className="w-8 h-8 text-secondary mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-2">Modalidad</h3>
              <p className="text-muted-foreground">100% Virtual</p>
              <p className="text-sm text-muted-foreground mt-1">Google Meet</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-card border border-border rounded-2xl p-8 mb-12 animate-slide-in-up">
            <h3 className="font-display text-2xl font-bold mb-6 text-center">
              ¿Qué incluye tu <span className="text-primary">participación</span>?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 text-left group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-ai-green mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 animate-fade-in">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-3xl font-bold text-primary">100%</span>
                <span className="text-xl font-semibold text-foreground">GRATUITO</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Sin costos ocultos, sin letra pequeña. Solo regístrate y participa.
              </p>
              
              <div className="space-y-4">
                <Button 
                  variant="hero" 
                  size="xl"
                  className="animate-glow-pulse text-lg px-12 py-4"
                  onClick={() => {
                    // Aquí iría la lógica de registro real
                    window.open('https://forms.google.com/your-registration-form', '_blank');
                  }}
                >
                  Registrarme Ahora
                </Button>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px bg-border flex-1"></div>
                  <span className="text-sm text-muted-foreground">o</span>
                  <div className="h-px bg-border flex-1"></div>
                </div>
                
                <WhatsAppInlineButton />
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                ⚡ Cupos limitados • 🎓 Certificado incluido • 🚀 Acceso inmediato
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};