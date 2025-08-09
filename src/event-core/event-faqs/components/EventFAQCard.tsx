import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp, 
  ThumbsDown, 
  Clock, 
  Tag,
  Star,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { EventFAQ, EventFAQCardProps } from '../types/event-faq.types';
import { eventFAQsUtils } from '../services/event-faqs.service';
import { useFAQFeedbackState } from '../hooks/useEventFAQs';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { toast } from '@/shared/ui/use-toast';

/**
 * Componente para mostrar una FAQ individual del evento
 * Incluye funcionalidades de expansión, feedback y visualización de metadatos
 */
export const EventFAQCard: React.FC<EventFAQCardProps> = ({
  faq,
  isExpanded: controlledExpanded,
  onToggle,
  showFeedback = true,
  showMetadata = true,
  variant = 'default',
  className = ''
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState('');
  
  const { submitFeedback, getFeedbackState, isSubmitting } = useFAQFeedbackState();
  const feedbackState = getFeedbackState(faq.id);
  
  // Determinar si está expandido (controlado o interno)
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle(faq.id);
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const handleFeedback = async (isHelpful: boolean) => {
    if (feedbackState.hasVoted) {
      toast({
        title: 'Ya has votado',
        description: 'Ya has enviado feedback para esta FAQ.',
        variant: 'default'
      });
      return;
    }

    const result = await submitFeedback(faq.id, isHelpful, feedbackComment);
    
    if (result.success) {
      toast({
        title: 'Gracias por tu feedback',
        description: 'Tu opinión nos ayuda a mejorar.',
        variant: 'default'
      });
      setShowFeedbackForm(false);
      setFeedbackComment('');
    } else {
      toast({
        title: 'Error',
        description: 'No se pudo enviar el feedback. Inténtalo de nuevo.',
        variant: 'destructive'
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      general: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      registration: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      schedule: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      location: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      speakers: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      networking: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      technical: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      accommodation: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      food: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      certificates: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
      sponsors: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      accessibility: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
      covid: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      contact: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300'
    };
    return colors[category] || colors.general;
  };

  const cardVariants = {
    default: 'border border-gray-200 dark:border-gray-700',
    featured: 'border-2 border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/50',
    compact: 'border border-gray-200 dark:border-gray-700 shadow-sm'
  };

  return (
    <Card className={`${cardVariants[variant]} transition-all duration-200 hover:shadow-md ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {faq.featured && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  <Star className="w-3 h-3 mr-1" />
                  Destacada
                </Badge>
              )}
              <Badge className={getCategoryColor(faq.category)}>
                {eventFAQsUtils.formatCategory(faq.category)}
              </Badge>
              {faq.priority <= 3 && (
                <Badge variant="outline" className="text-xs">
                  Alta prioridad
                </Badge>
              )}
            </div>
            
            <button
              onClick={handleToggle}
              className="text-left w-full group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1 -m-1"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {faq.question}
              </h3>
            </button>
            
            {showMetadata && (
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{eventFAQsUtils.formatLastUpdated(faq.lastUpdated)}</span>
                </div>
                
                {(faq.helpful > 0 || faq.notHelpful > 0) && (
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{eventFAQsUtils.formatHelpfulCount(faq.helpful, faq.notHelpful)}</span>
                  </div>
                )}
                
                {faq.views > 0 && (
                  <span>{faq.views} visualizaciones</span>
                )}
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            className="flex-shrink-0 p-2"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div 
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
              
              {faq.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <div className="flex flex-wrap gap-1">
                    {faq.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Enlaces relacionados:
                  </h4>
                  <div className="space-y-1">
                    {faq.relatedLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {link.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {showFeedback && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {!feedbackState.hasVoted ? (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ¿Te resultó útil esta información?
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFeedback(true)}
                          disabled={isSubmitting}
                          className="flex items-center gap-1"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          Sí, útil
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                          disabled={isSubmitting}
                          className="flex items-center gap-1"
                        >
                          <ThumbsDown className="w-4 h-4" />
                          No, necesita mejoras
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-gray-500"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Comentar
                        </Button>
                      </div>
                      
                      <AnimatePresence>
                        {showFeedbackForm && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <Textarea
                                placeholder="¿Qué se podría mejorar en esta respuesta? (opcional)"
                                value={feedbackComment}
                                onChange={(e) => setFeedbackComment(e.target.value)}
                                className="min-h-[80px]"
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleFeedback(false)}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Enviando...' : 'Enviar feedback'}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setShowFeedbackForm(false);
                                    setFeedbackComment('');
                                  }}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      {feedbackState.voteType === 'helpful' ? (
                        <>
                          <ThumbsUp className="w-4 h-4 text-green-600" />
                          <span>Marcaste esta FAQ como útil. ¡Gracias por tu feedback!</span>
                        </>
                      ) : (
                        <>
                          <ThumbsDown className="w-4 h-4 text-orange-600" />
                          <span>Gracias por tu feedback. Trabajaremos en mejorar esta respuesta.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default EventFAQCard;