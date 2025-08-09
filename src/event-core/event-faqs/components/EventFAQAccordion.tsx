import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  Star, 
  Clock, 
  ThumbsUp, 
  Tag,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { EventFAQ, EventFAQAccordionProps, FAQCategory } from '../types/event-faq.types';
import { eventFAQsUtils } from '../services/event-faqs.service';
import { useFAQsByCategories } from '../hooks/useEventFAQs';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/collapsible';
import { Separator } from '@/shared/ui/separator';
import { LoadingSpinner } from '@/shared/common/LoadingSpinner';

/**
 * Componente para mostrar FAQs en formato acordeón agrupadas por categorías
 * Incluye funcionalidades de búsqueda, filtrado y navegación por categorías
 */
export const EventFAQAccordion: React.FC<EventFAQAccordionProps> = ({
  initialParams = {},
  showSearch = true,
  showCategoryFilter = true,
  allowMultipleOpen = false,
  variant = 'default',
  className = '',
  onFAQClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<FAQCategory[]>([]);
  const [openCategories, setOpenCategories] = useState<Set<FAQCategory>>(new Set());
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());
  
  const {
    groupedFAQs,
    categoriesWithCounts,
    totalFAQs,
    isLoading,
    error
  } = useFAQsByCategories({
    ...initialParams,
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    limit: 100 // Cargar más FAQs para el acordeón
  });

  // Filtrar FAQs por búsqueda
  const filteredGroupedFAQs = React.useMemo(() => {
    if (!searchQuery.trim()) return groupedFAQs;
    
    const filtered: Record<FAQCategory, EventFAQ[]> = {};
    
    Object.entries(groupedFAQs).forEach(([category, faqs]) => {
      const filteredFAQs = eventFAQsUtils.searchFAQs(faqs, searchQuery);
      if (filteredFAQs.length > 0) {
        filtered[category as FAQCategory] = filteredFAQs;
      }
    });
    
    return filtered;
  }, [groupedFAQs, searchQuery]);

  const handleCategoryToggle = (category: FAQCategory) => {
    const newOpenCategories = new Set(openCategories);
    
    if (!allowMultipleOpen) {
      newOpenCategories.clear();
    }
    
    if (openCategories.has(category)) {
      newOpenCategories.delete(category);
    } else {
      newOpenCategories.add(category);
    }
    
    setOpenCategories(newOpenCategories);
  };

  const handleFAQToggle = (faqId: string) => {
    const newOpenFAQs = new Set(openFAQs);
    
    if (!allowMultipleOpen) {
      newOpenFAQs.clear();
    }
    
    if (openFAQs.has(faqId)) {
      newOpenFAQs.delete(faqId);
    } else {
      newOpenFAQs.add(faqId);
    }
    
    setOpenFAQs(newOpenFAQs);
    
    if (onFAQClick) {
      const allFAQs = Object.values(groupedFAQs).flat();
      const faq = allFAQs.find(f => f.id === faqId);
      if (faq) onFAQClick(faq);
    }
  };

  const toggleCategoryFilter = (category: FAQCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };

  const getCategoryIcon = (category: FAQCategory) => {
    const iconMap: Record<FAQCategory, React.ComponentType<any>> = {
      general: Star,
      registration: Star,
      schedule: Clock,
      location: Star,
      speakers: Star,
      networking: Star,
      technical: Star,
      accommodation: Star,
      food: Star,
      certificates: Star,
      sponsors: Star,
      accessibility: Star,
      covid: Star,
      contact: Star
    };
    return iconMap[category] || Star;
  };

  const getCategoryColor = (category: FAQCategory) => {
    const colorMap: Record<FAQCategory, string> = {
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
    return colorMap[category] || colorMap.general;
  };

  if (error) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="p-6 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Error al cargar las FAQs: {error.message}
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con búsqueda y filtros */}
      {(showSearch || showCategoryFilter) && (
        <Card>
          <CardHeader className="pb-4">
            <div className="space-y-4">
              {/* Búsqueda */}
              {showSearch && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar en FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}
              
              {/* Filtros de categoría */}
              {showCategoryFilter && categoriesWithCounts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Filtrar por categoría:</span>
                    {(selectedCategories.length > 0 || searchQuery) && (
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        Limpiar filtros
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categoriesWithCounts.map((categoryInfo) => {
                      const isSelected = selectedCategories.includes(categoryInfo.category);
                      const Icon = getCategoryIcon(categoryInfo.category);
                      
                      return (
                        <Button
                          key={categoryInfo.category}
                          variant={isSelected ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => toggleCategoryFilter(categoryInfo.category)}
                          className="flex items-center gap-2"
                        >
                          <Icon className="w-3 h-3" />
                          {categoryInfo.name}
                          <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                            {categoryInfo.count}
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>
      )}
      
      {/* Información de resultados */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {searchQuery ? (
          <span>Resultados para "{searchQuery}": {Object.values(filteredGroupedFAQs).flat().length} FAQs encontradas</span>
        ) : (
          <span>Mostrando {totalFAQs} FAQs organizadas por categorías</span>
        )}
      </div>
      
      {/* Acordeón de FAQs */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : Object.keys(filteredGroupedFAQs).length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              {searchQuery ? (
                <div>
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
                  <p>Intenta con otros términos de búsqueda o ajusta los filtros.</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium mb-2">No hay FAQs disponibles</h3>
                  <p>Aún no se han agregado preguntas frecuentes.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(filteredGroupedFAQs).map(([category, faqs]) => {
            const categoryInfo = eventFAQsUtils.getCategoryInfo(category as FAQCategory);
            const Icon = getCategoryIcon(category as FAQCategory);
            const isOpen = openCategories.has(category as FAQCategory);
            
            return (
              <Card key={category} className={variant === 'compact' ? 'shadow-sm' : ''}>
                <Collapsible open={isOpen} onOpenChange={() => handleCategoryToggle(category as FAQCategory)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <CardTitle className="text-lg">{categoryInfo.name}</CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {categoryInfo.description} • {faqs.length} pregunta{faqs.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(category as FAQCategory)}>
                            {faqs.length}
                          </Badge>
                          {isOpen ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {faqs.map((faq, index) => {
                          const isFAQOpen = openFAQs.has(faq.id);
                          
                          return (
                            <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                              <Collapsible open={isFAQOpen} onOpenChange={() => handleFAQToggle(faq.id)}>
                                <CollapsibleTrigger asChild>
                                  <div className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                          {faq.featured && (
                                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                              <Star className="w-3 h-3 mr-1" />
                                              Destacada
                                            </Badge>
                                          )}
                                          {faq.priority <= 3 && (
                                            <Badge variant="outline" className="text-xs">
                                              Alta prioridad
                                            </Badge>
                                          )}
                                        </div>
                                        
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                                          {faq.question}
                                        </h4>
                                        
                                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                          <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{eventFAQsUtils.formatLastUpdated(faq.lastUpdated)}</span>
                                          </div>
                                          
                                          {(faq.helpful > 0 || faq.notHelpful > 0) && (
                                            <div className="flex items-center gap-1">
                                              <ThumbsUp className="w-3 h-3" />
                                              <span>{eventFAQsUtils.formatHelpfulCount(faq.helpful, faq.notHelpful)}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      
                                      {isFAQOpen ? (
                                        <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                      )}
                                    </div>
                                  </div>
                                </CollapsibleTrigger>
                                
                                <CollapsibleContent>
                                  <div className="px-4 pb-4">
                                    <Separator className="mb-4" />
                                    
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
                                          {faq.tags.map((tag, tagIndex) => (
                                            <Badge key={tagIndex} variant="outline" className="text-xs">
                                              {tag}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                                          Enlaces relacionados:
                                        </h5>
                                        <div className="space-y-1">
                                          {faq.relatedLinks.map((link, linkIndex) => (
                                            <a
                                              key={linkIndex}
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
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventFAQAccordion;