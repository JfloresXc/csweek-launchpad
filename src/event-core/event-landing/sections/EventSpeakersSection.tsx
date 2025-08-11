import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EventSpeakersMockService } from '../../event-speakers/services/event-speakers-mock.service';
import { EventSpeaker } from '../../event-speakers/types/event-speaker.types';

/**
 * Sección de speakers para la landing page de CS WEEK 2025
 * Muestra los speakers destacados del evento con diseño moderno
 */
export const EventSpeakersSection: React.FC = () => {
  const navigate = useNavigate();
  const [speakers, setSpeakers] = React.useState<EventSpeaker[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
   
   // Mostrar todos los speakers en el carrusel
   const carouselSpeakers = speakers;
   
   // Responsive speakers per view
   const [speakersPerView, setSpeakersPerView] = useState(3);
   
   // Update speakers per view based on screen size
   useEffect(() => {
     const updateSpeakersPerView = () => {
       if (window.innerWidth < 768) {
         setSpeakersPerView(1);
       } else if (window.innerWidth < 1024) {
         setSpeakersPerView(2);
       } else {
         setSpeakersPerView(3);
       }
     };
     
     updateSpeakersPerView();
     window.addEventListener('resize', updateSpeakersPerView);
     return () => window.removeEventListener('resize', updateSpeakersPerView);
   }, []);
   
   const totalSlides = Math.max(0, Math.ceil(carouselSpeakers.length / speakersPerView));
   
   const nextSlide = () => {
     setCurrentSlide(prev => (prev + 1) % totalSlides);
   };
   
   const prevSlide = () => {
     setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
   };
   
   // Calcular el desplazamiento considerando el gap entre cards
   const getTranslateX = () => {
     const cardWidth = 100 / speakersPerView;
     return `-${currentSlide * cardWidth}%`;
   };

  React.useEffect(() => {
    const loadSpeakers = async () => {
      try {
        setLoading(true);
        // Obtener todos los speakers para el carousel (sin límite)
        const allSpeakers = await EventSpeakersMockService.getEventSpeakers({ limit: 50 });
        setSpeakers(allSpeakers.docs); // Mostrar todos los speakers en el carousel
      } catch (err) {
        setError('Error al cargar los speakers');
        console.error('Error loading speakers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSpeakers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gradient-card border border-border rounded-xl p-6 animate-pulse">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-32 mx-auto mb-2"></div>
                <div className="h-3 bg-muted rounded w-24 mx-auto mb-4"></div>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="text-destructive mb-4">{error}</div>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="speakers" className="py-20 bg-muted/10 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-40"></div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-csweek-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-csweek-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-csweek-success/30 rounded-full blur-3xl"></div>
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
            <Users className="w-4 h-4" />
            Speakers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Aprende de los
            <span className="text-primary"> Mejores</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conecta con expertos de clase mundial que están definiendo el futuro de la tecnología.
            Speakers de Google, Microsoft, Meta y las startups más innovadoras.
          </p>
        </motion.div>

        {/* Speakers Carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden px-4">
            <motion.div 
              className="flex"
              animate={{ x: getTranslateX() }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ paddingTop: '20px', paddingBottom: '20px' }}
            >
              {carouselSpeakers.map((speaker, index) => (
                <motion.div
                  key={speaker.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / speakersPerView}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-glow transition-all duration-300 border border-border bg-gradient-card backdrop-blur-sm hover:scale-105 h-full transform-gpu will-change-transform">
                    <CardContent className="p-8">
                      {/* Speaker Avatar */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-csweek-primary to-csweek-secondary rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <Avatar className="w-20 h-20 mx-auto relative z-10 ring-4 ring-background shadow-card">
                          <AvatarImage src={speaker.avatar} alt={speaker.name} />
                          <AvatarFallback className="bg-gradient-to-r from-csweek-primary to-csweek-secondary text-white text-lg font-bold">
                            {speaker.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {speaker.featured && (
                          <div className="absolute -top-2 -right-2 bg-csweek-warning rounded-full p-1">
                            <Star className="w-4 h-4 text-white fill-current" />
                          </div>
                        )}
                      </div>

                      {/* Speaker Info */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {speaker.name}
                        </h3>
                        <p className="text-secondary font-medium mb-3">{speaker.title}</p>
                      </div>

                      {/* Bio */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 text-center">
                        {speaker.bio}
                      </p>



                      {/* Social Links */}
                      <div className="flex justify-center gap-3">
                        {speaker.social.twitter && (
                          <a
                            href={speaker.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-csweek-secondary/10 hover:bg-csweek-secondary text-csweek-secondary hover:text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        )}
                        {speaker.social.linkedin && (
                          <a
                            href={speaker.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-csweek-secondary/10 hover:bg-csweek-secondary text-csweek-secondary hover:text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {speaker.social.github && (
                          <a
                            href={speaker.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-muted hover:bg-foreground text-muted-foreground hover:text-background rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Carousel Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* View All Speakers Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/speakers')}
            variant="hero"
            size="lg"
            className="animate-glow-pulse group"
          >
            Ver todos los speakers
            <Users className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>


      </div>
    </section>
  );
};