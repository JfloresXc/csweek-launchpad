import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Star, ExternalLink, Award, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EventSponsorsMockService } from '../../event-sponsors/services/event-sponsors-mock.service';
import { EventSponsor } from '../../event-sponsors/types/event-sponsor.types';

/**
 * Sección de empresas aliadas para la landing page de CS WEEK 2025
 * Muestra las empresas que apoyan el evento
 */
export const EventSponsorsSection: React.FC = () => {
  // Empresas aliadas temporales (serán reemplazadas con datos reales)
  const empresasAliadas = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      description: 'Líder en soluciones tecnológicas empresariales y desarrollo de software innovador.',
      logo: 'https://via.placeholder.com/200x100/3B82F6/FFFFFF?text=TechCorp',
      website: 'https://techcorp.example.com',
      tier: 'gold' as const,
      featured: true,
      category: 'Tecnología'
    },
    {
      id: '2',
      name: 'InnovateLab',
      description: 'Laboratorio de innovación especializado en inteligencia artificial y machine learning.',
      logo: 'https://via.placeholder.com/200x100/10B981/FFFFFF?text=InnovateLab',
      website: 'https://innovatelab.example.com',
      tier: 'gold' as const,
      featured: true,
      category: 'IA & ML'
    }
  ];

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-gradient-card border border-border rounded-2xl p-8 animate-pulse">
                <div className="h-16 bg-muted rounded mx-auto mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-destructive mb-4">{error}</div>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="sponsors" className="py-20 bg-muted/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="bg-gradient-glow absolute inset-0 opacity-30"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-32 h-32 bg-csweek-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-csweek-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-csweek-secondary/10 text-csweek-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Empresas Aliadas
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nuestras 
            <span className="text-primary"> Empresas </span>Aliadas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empresas líderes en tecnología que apoyan el crecimiento de la comunidad tech en Perú.
            Conoce a las organizaciones que hacen posible 
            <span className="text-yellow-500"> CS WEEK 2025</span>.
          </p>
        </motion.div>

        {/* Allied Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {empresasAliadas.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-card transition-all duration-300 bg-gradient-card border-border hover:scale-105 relative overflow-hidden">
                {/* Company indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-hero"></div>
                
                <CardContent className="p-8">
                  {/* Logo */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="h-20 w-32 flex items-center justify-center">
                      {company.logo ? (
                        <img 
                          src={company.logo} 
                          alt={company.name}
                          className="max-h-full max-w-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                        />
                      ) : (
                        <div className="h-20 w-32 bg-gradient-hero rounded-lg flex items-center justify-center text-white font-bold text-xl">
                          {company.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-csweek-primary transition-colors">
                      {company.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {company.description}
                    </p>

                    {/* Category Badge */}
                    <Badge 
                      variant="secondary" 
                      className="bg-csweek-secondary/10 text-csweek-secondary border-0 text-sm mb-4"
                    >
                      {company.category === 'Tecnología' && '💻 Tecnología'}
                      {company.category === 'IA & ML' && '🤖 IA & ML'}
                      {company.category === 'Startup' && '🚀 Startup'}
                      {company.category === 'Empresa' && '🏢 Empresa'}
                      {company.category === 'Consultoría' && '💼 Consultoría'}
                      {company.category === 'Innovación' && '⚡ Innovación'}
                    </Badge>

                    {/* Website Link */}
                    {company.website && (
                      <div className="text-center">
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-csweek-secondary hover:text-primary transition-colors text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visitar sitio web
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};