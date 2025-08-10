import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Search, Filter, ArrowLeft } from 'lucide-react';
import { EventSpeaker } from '../../event-speakers/types/event-speaker.types';
import { EventSpeakersMockService } from '../../event-speakers/services/event-speakers-mock.service';
import { cn } from '@/lib/utils';

interface EventSpeakersPageProps {
  className?: string;
}

export const EventSpeakersPage: React.FC<EventSpeakersPageProps> = ({ className }) => {
  const [speakers, setSpeakers] = useState<EventSpeaker[]>([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState<EventSpeaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useEffect(() => {
    const loadSpeakers = async () => {
      try {
        setLoading(true);
        const speakersResponse = await EventSpeakersMockService.getEventSpeakers({ limit: 100 });
        const speakersData = speakersResponse.docs;
        setSpeakers(speakersData);
        setFilteredSpeakers(speakersData);
      } catch (err) {
        setError('Error al cargar los speakers');
        console.error('Error loading speakers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSpeakers();
  }, []);

  useEffect(() => {
    let filtered = speakers;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(speaker => 
        speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        speaker.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        speaker.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        speaker.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por track
    if (selectedTrack !== 'all') {
      filtered = filtered.filter(speaker => speaker.track === selectedTrack);
    }

    // Filtrar por nivel de experiencia
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(speaker => speaker.experienceLevel === selectedLevel);
    }

    setFilteredSpeakers(filtered);
  }, [speakers, searchTerm, selectedTrack, selectedLevel]);

  const getTrackLabel = (track: string) => {
    const trackLabels: Record<string, string> = {
      frontend: '🎨 Frontend',
      backend: '⚙️ Backend',
      mobile: '📱 Mobile',
      ai: '🤖 AI/ML',
      devops: '🚀 DevOps',
      general: '💡 General'
    };
    return trackLabels[track] || track;
  };

  const tracks = Array.from(new Set(speakers.map(speaker => speaker.track)));
  const levels = Array.from(new Set(speakers.map(speaker => speaker.experienceLevel)));

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando speakers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-muted/10", className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-csweek-primary to-csweek-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Todos los Speakers
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Conoce a todos los expertos que compartirán su conocimiento en CS WEEK 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 mb-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar speakers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Track Filter */}
            <Select value={selectedTrack} onValueChange={setSelectedTrack}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tracks</SelectItem>
                {tracks.map(track => (
                  <SelectItem key={track} value={track}>
                    {getTrackLabel(track)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Results Count */}
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-sm text-muted-foreground">
                {filteredSpeakers.length} speaker{filteredSpeakers.length !== 1 ? 's' : ''} encontrado{filteredSpeakers.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredSpeakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="break-inside-avoid mb-6"
            >
              <Card className="group hover:shadow-glow transition-all duration-300 border border-border bg-gradient-card backdrop-blur-sm hover:scale-105">
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
        </div>

        {/* Empty State */}
        {filteredSpeakers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No se encontraron speakers</p>
              <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedTrack('all');
                setSelectedLevel('all');
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSpeakersPage;