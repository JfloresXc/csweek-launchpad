import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List, 
  ChevronLeft, 
  ChevronRight,
  X,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import { EventFAQ, EventFAQListProps, FAQCategory } from '../types/event-faq.types';
import { eventFAQsUtils } from '../services/event-faqs.service';
import { useAdvancedFAQs } from '../hooks/useEventFAQs';
import { EventFAQCard } from './EventFAQCard';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Checkbox } from '@/shared/ui/checkbox';
import { Separator } from '@/shared/ui/separator';
import { LoadingSpinner } from '@/shared/common/LoadingSpinner';

/**
 * Componente para mostrar una lista de FAQs del evento con funcionalidades avanzadas
 * Incluye búsqueda, filtrado, ordenamiento y paginación
 */
export const EventFAQList: React.FC<EventFAQListProps> = ({
  initialParams = {},
  showSearch = true,
  showFilters = true,
  showPagination = true,
  variant = 'default',
  className = '',
  onFAQClick
}) => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  
  const {
    faqs,
    totalFAQs,
    pagination,
    isLoading,
    error,
    isSearching,
    hasActiveFilters,
    filters,
    searchQuery,
    updateFilter,
    toggleCategory,
    clearFilters,
    handleSearch,
    clearSearch,
    params,
    updateParams,
    resetAll
  } = useAdvancedFAQs(initialParams);

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
    if (onFAQClick) {
      const faq = faqs.find(f => f.id === faqId);
      if (faq) onFAQClick(faq);
    }
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
    setExpandedFAQ(null); // Colapsar FAQs al cambiar página
  };

  const categories: { value: FAQCategory; label: string }[] = [
    { value: 'general', label: 'General' },
    { value: 'registration', label: 'Registro' },
    { value: 'schedule', label: 'Agenda' },
    { value: 'location', label: 'Ubicación' },
    { value: 'speakers', label: 'Speakers' },
    { value: 'networking', label: 'Networking' },
    { value: 'technical', label: 'Técnico' },
    { value: 'accommodation', label: 'Alojamiento' },
    { value: 'food', label: 'Comida' },
    { value: 'certificates', label: 'Certificados' },
    { value: 'sponsors', label: 'Patrocinadores' },
    { value: 'accessibility', label: 'Accesibilidad' },
    { value: 'covid', label: 'Medidas Sanitarias' },
    { value: 'contact', label: 'Contacto' }
  ];

  const sortOptions = [
    { value: 'priority', label: 'Prioridad', icon: Star },
    { value: '-priority', label: 'Prioridad (desc)', icon: Star },
    { value: 'helpful', label: 'Más útiles', icon: TrendingUp },
    { value: 'recent', label: 'Recientes', icon: Clock },
    { value: 'question', label: 'A-Z', icon: SortAsc },
    { value: '-question', label: 'Z-A', icon: SortDesc }
  ];

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
      {/* Header con búsqueda y controles */}
      {(showSearch || showFilters) && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Búsqueda */}
              {showSearch && (
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar en FAQs..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
              
              {/* Controles */}
              <div className="flex items-center gap-2">
                {/* Ordenamiento */}
                <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                
                {/* Filtros */}
                {showFilters && (
                  <Button
                    variant="outline"
                    onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                    className={`${hasActiveFilters ? 'border-blue-500 text-blue-600' : ''}`}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                        {filters.categories.length + (filters.showFeaturedOnly ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                )}
                
                {/* Vista */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-r-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-l-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Panel de filtros */}
            <AnimatePresence>
              {showFiltersPanel && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    {/* Filtro de destacadas */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={filters.showFeaturedOnly}
                        onCheckedChange={(checked) => updateFilter('showFeaturedOnly', checked)}
                      />
                      <label htmlFor="featured" className="text-sm font-medium">
                        Solo FAQs destacadas
                      </label>
                    </div>
                    
                    {/* Filtro de categorías */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Categorías</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {categories.map((category) => (
                          <div key={category.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={category.value}
                              checked={filters.categories.includes(category.value)}
                              onCheckedChange={() => toggleCategory(category.value)}
                            />
                            <label htmlFor={category.value} className="text-sm">
                              {category.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Acciones de filtros */}
                    {hasActiveFilters && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                          Limpiar filtros
                        </Button>
                        <Button variant="outline" size="sm" onClick={resetAll}>
                          Resetear todo
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>
        </Card>
      )}
      
      {/* Información de resultados */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div>
          {isSearching && searchQuery ? (
            <span>Resultados para "{searchQuery}": {totalFAQs} FAQs encontradas</span>
          ) : (
            <span>Mostrando {faqs.length} de {totalFAQs} FAQs</span>
          )}
        </div>
        
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span>Filtros activos:</span>
            {filters.showFeaturedOnly && (
              <Badge variant="secondary" className="text-xs">
                Destacadas
              </Badge>
            )}
            {filters.categories.map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {categories.find(c => c.value === category)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCategory(category)}
                  className="ml-1 p-0 h-auto w-auto"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      {/* Lista de FAQs */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : faqs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              {isSearching ? (
                <div>
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
                  <p>Intenta con otros términos de búsqueda o ajusta los filtros.</p>
                  <Button variant="outline" onClick={clearSearch} className="mt-4">
                    Limpiar búsqueda
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
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' 
            : 'space-y-4'
        }`}>
          <AnimatePresence mode="popLayout">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <EventFAQCard
                  faq={faq}
                  isExpanded={expandedFAQ === faq.id}
                  onToggle={handleFAQToggle}
                  variant={faq.featured ? 'featured' : variant === 'compact' ? 'compact' : 'default'}
                  showFeedback={true}
                  showMetadata={true}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {/* Paginación */}
      {showPagination && pagination.totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Página {pagination.page} de {pagination.totalPages}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage || isLoading}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Anterior
                </Button>
                
                {/* Números de página */}
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, pagination.page - 2) + i;
                    if (pageNum > pagination.totalPages) return null;
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === pagination.page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        disabled={isLoading}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNextPage || isLoading}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventFAQList;